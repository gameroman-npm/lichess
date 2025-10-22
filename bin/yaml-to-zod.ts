import { z } from "zod";

const SchemaUnparsed = z.unknown().brand("SchemaUnparsed");
type SchemaUnparsed = z.infer<typeof SchemaUnparsed>;

const Primitive = z.union([z.string(), z.number(), z.boolean()]);

const BaseSchema = z.object({
  // `$ref` is handled specially
  $ref: z.never().optional(),

  // `oneOf`, `allOf`, `anyOf` are handled specially
  oneOf: z.never().optional(),
  allOf: z.never().optional(),
  anyOf: z.never().optional(),

  // `type` exists on non-special types
  type: z.never().optional(),

  // might exist on any schema
  description: z.string().optional(),
  default: Primitive.optional(),
  deprecated: z.boolean().optional(),
});

const SchemaSchemaRef = BaseSchema.extend({ $ref: z.string() }).strict();

const SchemaSchemaNull = BaseSchema.extend({
  type: z.literal("null"),
}).strict();

const SchemaSchemaString = BaseSchema.extend({
  type: z.literal("string"),
  const: z.union([z.string()]).optional(),
  example: z.union([z.string()]).optional(),
  format: z.literal("uri").optional(),
  enum: z.array(z.string()).optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
}).strict();

const SchemaSchemaInteger = BaseSchema.extend({
  type: z.literal("integer"),
  const: z.union([z.number()]).optional(),
  example: z.union([z.number()]).optional(),
  format: z.literal("int64").optional(),
  enum: z.array(z.int()).optional(),
}).strict();

const SchemaSchemaBoolean = BaseSchema.extend({
  type: z.literal("boolean"),
  const: z.union([z.boolean()]).optional(),
  example: z.union([z.boolean()]).optional(),
}).strict();

const SchemaSchemaPrimary = z.discriminatedUnion("type", [
  SchemaSchemaString,
  SchemaSchemaInteger,
  SchemaSchemaBoolean,
]);

const SchemaSchemaObject = BaseSchema.extend({
  type: z.literal("object"),
  title: z.string().optional(),
  properties: z.record(z.string(), SchemaUnparsed),
  required: z.array(z.string()).optional(),
  const: z.union([z.object()]).optional(),
  example: z.union([z.object()]).optional(),
}).strict();

const SchemaSchemaArray = BaseSchema.extend({
  type: z.literal("array"),
  items: SchemaUnparsed.optional(),
  const: z.union([z.array(z.unknown())]).optional(),
  example: z.union([z.array(z.unknown())]).optional(),
  maxItems: z.any().optional(),
}).strict();

const SchemaSchemaOneOf = BaseSchema.extend({
  oneOf: z.array(SchemaUnparsed),
}).strict();

const SchemaSchema = z.union([
  SchemaSchemaRef,
  SchemaSchemaNull,
  SchemaSchemaPrimary,
  SchemaSchemaObject,
  SchemaSchemaArray,
  SchemaSchemaOneOf,
]);

type Schema = z.infer<typeof SchemaSchema>;

type ConvertResult = { zodSchema: string; refs: string[] };

function convertToZod_(schema: Schema): ConvertResult {
  if (schema.$ref !== undefined) {
    const ref = schema.$ref;
    const name = ref.split("/").pop()!.replace(".yaml", "");
    return { zodSchema: `${name}`, refs: [name] };
  }

  if (schema.oneOf) {
    const subResults = schema.oneOf.map((item) => convertToZod(item));
    const zodSchemas = subResults.map((r) => r.zodSchema);
    const allRefs = new Set<string>();
    subResults.forEach((r) => r.refs.forEach((ref) => allRefs.add(ref)));
    return {
      zodSchema: `z.union([${zodSchemas.join(", ")}])`,
      refs: Array.from(allRefs),
    };
  }

  if (schema.type === "null") {
    return { zodSchema: "z.null()", refs: [] };
  }

  if (schema.const !== undefined) {
    return {
      zodSchema: `z.literal(${JSON.stringify(schema.const)})`,
      refs: [],
    };
  }

  if (schema.type) {
    const type = schema.type;
    switch (type) {
      case "string": {
        if (schema.enum) {
          const literals = JSON.stringify(schema.enum);
          return { zodSchema: `z.literal(${literals})`, refs: [] };
        }
        if (schema.format === "uri") {
          return { zodSchema: "z.url()", refs: [] };
        }
        let schemaStr = "z.string()";
        if (schema.minLength !== undefined) {
          schemaStr += `.min(${schema.minLength})`;
        }
        if (schema.maxLength !== undefined) {
          schemaStr += `.max(${schema.maxLength})`;
        }
        return { zodSchema: schemaStr, refs: [] };
      }
      case "integer": {
        if (schema.enum) {
          const literals = schema.enum.join(", ");
          return { zodSchema: `z.literal([${literals}])`, refs: [] };
        }
        return { zodSchema: "z.int()", refs: [] };
      }
      case "boolean": {
        return { zodSchema: "z.boolean()", refs: [] };
      }
      case "object": {
        const props = schema.properties || {};
        const required = new Set(schema.required || []);
        const zodProps: Record<string, string> = {};
        const allRefs = new Set<string>();
        for (const [k, v] of Object.entries(props)) {
          const { zodSchema: sch, refs: propRefs } = convertToZod(v);
          propRefs.forEach((r) => allRefs.add(r));
          let propStr = sch;
          if (!required.has(k)) {
            propStr += ".optional()";
          }
          zodProps[k] = propStr;
        }
        const inner =
          "{\n" +
          Object.entries(zodProps)
            .map(([k, v]) => `  ${k}: ${v},`)
            .join("\n") +
          "\n}";
        return { zodSchema: `z.object(${inner})`, refs: Array.from(allRefs) };
      }
      case "array": {
        const items = schema.items;
        if (!items) {
          return { zodSchema: "z.array(z.unknown())", refs: [] };
        }
        const { zodSchema: itemSchema, refs: itemRefs } = convertToZod(items);
        return { zodSchema: `z.array(${itemSchema})`, refs: itemRefs } as const;
      }
    }
  }

  return assertNever(schema);
}

function assertNever(schema: never): never {
  throw new Error(`Unknown schema: ${JSON.stringify(schema)}`);
}

function convertToZod(schema: unknown | SchemaUnparsed): ConvertResult {
  return convertToZod_(SchemaSchema.parse(schema));
}

async function main() {
  const fileName = Bun.argv[2];

  if (!fileName) {
    throw new Error("Missing file name");
  }

  const fileNameWithExtension = `schemas/${fileName}.yaml` as const;

  const yamlStr = await Bun.file(fileNameWithExtension).text();

  const schema = Bun.YAML.parse(yamlStr);

  // console.log(schema);

  const { zodSchema, refs: uniqueRefs } = convertToZod(schema);

  uniqueRefs.sort();
  const refImports = uniqueRefs
    .map((refName) => `import ${refName} from "./${refName}";`)
    .join("\n");
  const spacedRefImports = refImports
    ? (`\n${refImports}\n` as const)
    : ("" as const);

  const tsCode = `import * as z from "zod";
${spacedRefImports}
const ${fileName} = ${zodSchema};

type ${fileName} = z.infer<typeof ${fileName}>;

export { ${fileName} };
export default ${fileName};
` as const;

  // console.log(tsCode);

  const outFilePath = `src/schemas/${fileName}.ts` as const;

  await Bun.write(outFilePath, tsCode);
}

await main();
