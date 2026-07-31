import * as path from "node:path";
import * as z from "zod";

const SchemaUnparsed = z
  .record(z.string(), z.unknown())
  .brand("SchemaUnparsed");
type Unparsed = z.infer<typeof SchemaUnparsed>;

const Primitive = z.union([z.string(), z.number(), z.boolean()]);

const BaseSchema = z.object({
  // `const` can only be on `string`, `number` and `boolean`
  const: z.never().optional(),

  // `default` can only be on `string`, `number` and `boolean`
  default: Primitive.nullish(),

  // `example` can be on any schema
  example: z.unknown().optional(),

  // `description` and `deprecated` can be on any schema
  description: z.string().optional(),
  deprecated: z.boolean().optional(),

  // might exist on `additionalProperties`
  "x-additionalPropertiesName": z.string().optional(),
});

const StringYamlRef = z
  .templateLiteral([z.string(), ".yaml"])
  .brand("StringYamlRef");

type StringYamlRef = z.infer<typeof StringYamlRef>;

const SchemaSchemaRef = BaseSchema.extend({
  type: z.literal("object").optional(),
  $ref: StringYamlRef,
})
  .strict()
  .transform((s) => ({ ...s, __schema: "$ref" as const }));

const SchemaSchemaNull = BaseSchema.extend({ type: z.literal("null") })
  .strict()
  .transform((s) => ({ ...s, __schema: "null" as const }));

const SchemaSchemaString = BaseSchema.extend({
  type: z.literal("string"),
  const: z.string().optional(),
  example: z.string().optional(),
  format: z.literal(["uri", "date-time", "int64"]).optional(),
  enum: z.array(z.string()).optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "string" as const }));

const SchemaSchemaStringNullable = BaseSchema.extend({
  type: z.tuple([z.literal("string"), z.literal("null")]),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "string:nullable" as const }));

const SchemaSchemaEnumNumber = BaseSchema.extend({
  type: z.literal(["integer", "number"]),
  enum: z.array(z.number()),
  example: z.number().optional(),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "enum:number" as const }));

const SchemaSchemaInteger = BaseSchema.extend({
  type: z.literal("integer"),
  const: z.int().optional(),
  example: z.int().optional(),
  format: z.literal("int64").optional(),
  minimum: z.number().optional(),
  maximum: z.number().optional(),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "integer" as const }));

const SchemaSchemaIntegerNullable = BaseSchema.extend({
  type: z.union([
    z.tuple([z.literal("integer"), z.literal("null")]),
    z.tuple([z.literal("null"), z.literal("integer")]),
  ]),
  example: z.int().optional(),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "integer:nullable" as const }));

const SchemaSchemaNumber = BaseSchema.extend({
  type: z.literal("number"),
  example: z.number().optional(),
  minimum: z.number().optional(),
  maximum: z.number().optional(),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "number" as const }));

export const SchemaSchemaBoolean = BaseSchema.extend({
  type: z.literal("boolean"),
  const: z.boolean().optional(),
  example: z.boolean().optional(),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "boolean" as const }));

export const SchemaSchemaPrimitive = z.union([
  SchemaSchemaString,
  SchemaSchemaInteger,
  SchemaSchemaEnumNumber,
  SchemaSchemaNumber,
  SchemaSchemaBoolean,
]);

const SchemaSchemaArrayOfPrimitive = z
  .strictObject({ type: z.literal("array"), items: SchemaSchemaPrimitive })
  .transform((s) => ({ ...s, __schema: "array:primitive" as const }));

export const SchemaSchemaRefToPrimitive = SchemaSchemaRef.transform((s) => ({
  ...s,
  __schema: "notverified:reftoprimitive" as const,
})).brand("notverified:SchemaSchemaRefToPrimitive");

const SchemaSchemaArrayOfRefToPrimitive = z
  .strictObject({ type: z.literal("array"), items: SchemaSchemaRefToPrimitive })
  .transform((s) => ({
    ...s,
    __schema: "array:notverified:reftoprimitive" as const,
  }));

const SchemaSchemaNullableRefToPrimitive = z
  .strictObject({
    allOf: z.tuple([SchemaSchemaRef, z.object({ default: z.null() })]),
  })
  .transform((s) => ({
    ...s,
    __schema: "notverified:reftoprimitive:nullable" as const,
  }))
  .brand("notverified:SchemaSchemaNullableRefToPrimitive");

const QueryParamSchemaSchema = z.union([
  SchemaSchemaPrimitive,
  SchemaSchemaArrayOfPrimitive,
  SchemaSchemaRefToPrimitive,
  SchemaSchemaArrayOfRefToPrimitive,
  SchemaSchemaNullableRefToPrimitive,
]);

export const OperationParameterBase = BaseSchema.extend({
  name: z.string(),
  description: z.string().optional(),
  example: Primitive.optional(),
}).strict();

export const OperationQueryParameterSchema = OperationParameterBase.extend({
  in: z.literal("query"),
  required: z.boolean().optional(),
  schema: QueryParamSchemaSchema,
})
  .strict()
  .transform((s) => ({ ...s, __schema: "unknown", __type: "query" }) as const);

const SchemaSchemaObject = BaseSchema.extend({
  type: z.literal("object").optional(),
  title: z.string().optional(),
  properties: z.record(z.string(), SchemaUnparsed),
  required: z.array(z.string()).optional(),
  example: z.object().optional(),
  additionalProperties: z.literal(false).optional(),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "object" as const }));

const SchemaSchemaObjectAdditionalProperties = BaseSchema.extend({
  type: z.literal("object").optional(),
  additionalProperties: SchemaUnparsed,
})
  .strict()
  .transform((s) => ({
    ...s,
    __schema: "additionalProperties" as const,
  }));

const SchemaSchemaArray = BaseSchema.extend({
  type: z.literal("array"),
  items: SchemaUnparsed.optional(),
  example: z.array(z.unknown()).optional(),
  minItems: z.int().optional(),
  maxItems: z.int().optional(),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "array" as const }));

const SchemaSchemaOneOf = BaseSchema.extend({ oneOf: z.array(SchemaUnparsed) })
  .strict()
  .transform((s) => ({ ...s, __schema: "oneOf" as const }));

const SchemaSchemaAllOf = BaseSchema.extend({
  type: z.literal("object").optional(),
  allOf: z.union([
    z.tuple([SchemaUnparsed]),
    z.tuple([SchemaUnparsed, SchemaUnparsed]),
  ]),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "allOf" as const }));

const SchemaSchemaAnyOf = BaseSchema.extend({
  type: z.literal("object").optional(),
  anyOf: z.array(SchemaSchemaRef),
  discriminator: z.object({
    propertyName: z.string(),
    mapping: z.record(z.string(), StringYamlRef),
  }),
  required: z.array(z.string()).optional(),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "anyOf" as const }));

const SchemaSchema = z.union([
  SchemaSchemaRef,
  SchemaSchemaNull,
  SchemaSchemaPrimitive,
  SchemaSchemaIntegerNullable,
  SchemaSchemaStringNullable,
  SchemaSchemaObject,
  SchemaSchemaObjectAdditionalProperties,
  SchemaSchemaArray,
  SchemaSchemaOneOf,
  SchemaSchemaAllOf,
  SchemaSchemaAnyOf,
  OperationQueryParameterSchema,
]);

type Schema = z.infer<typeof SchemaSchema>;

function parseUnparsed(schema: Unparsed) {
  return SchemaSchema.parse(schema satisfies Unparsed);
}

type ConvertResult = { readonly zodSchema: string; readonly refs: string[] };

function refToName(ref: StringYamlRef) {
  const name = path.basename(ref).replace(".yaml", "");
  if (name === "Error") return "BadRequestError";
  return name;
}

function recordToObject(
  object: Record<string, string>,
  options = { colon: true },
) {
  const entries = Object.entries(object);

  const colon = options.colon ? ":" : "";

  if (entries.length <= 1) {
    const firstEntry = entries[0];
    if (firstEntry) {
      return `{ "${firstEntry[0]}"${colon} ${firstEntry[1]} }`;
    }
    return "Record<string, never>";
  }

  const entriesKv = entries
    .map(([k, v]) => `  "${k}"${colon} ${v},`)
    .join("\n");

  return `{\n${entriesKv}\n}`;
}

function convertToZod(schema: Schema, prefix: string = ""): ConvertResult {
  if (schema.const !== undefined) {
    return {
      zodSchema: `z.literal(${JSON.stringify(schema.const)})`,
      refs: [],
    } as const;
  }

  try {
    switch (schema.__schema) {
      case "$ref": {
        const ref = schema.$ref;
        const name = refToName(ref);
        const prefixedName = `${prefix}${name}` as const;
        return { zodSchema: prefixedName, refs: prefix ? [] : [name] } as const;
      }
      case "oneOf": {
        const subResults = schema.oneOf.map((item) =>
          convertToZod(parseUnparsed(item), prefix),
        );
        const zodSchemas = subResults.map((r) => r.zodSchema);
        const allRefs = new Set<string>();
        subResults.forEach(
          (r) => void r.refs.forEach((ref) => void allRefs.add(ref)),
        );
        return {
          zodSchema: `z.union([${zodSchemas.join(", ")}])`,
          refs: Array.from(allRefs),
        } as const;
      }
      case "allOf": {
        const leftPart = convertToZod(parseUnparsed(schema.allOf[0]), prefix);
        if (!schema.allOf[1]) {
          return {
            zodSchema: leftPart.zodSchema,
            refs: leftPart.refs,
          } as const;
        }
        const rightPart = convertToZod(parseUnparsed(schema.allOf[1]), prefix);
        const allRefs = new Set([...leftPart.refs, ...rightPart.refs]);
        return {
          zodSchema: `z.intersection(${leftPart.zodSchema}, ${rightPart.zodSchema})`,
          refs: Array.from(allRefs),
        } as const;
      }
      case "anyOf": {
        const refNames: string[] = [];
        const allRefs = new Set<string>();
        for (const [_, ref] of Object.entries(schema.discriminator.mapping)) {
          const name = refToName(ref);
          refNames.push(prefix + name);
          if (!prefix) allRefs.add(name);
        }
        return {
          zodSchema: `z.discriminatedUnion("${
            schema.discriminator.propertyName
          }", [${refNames.join(", ")}])`,
          refs: Array.from(allRefs),
        } as const;
      }
      case "null": {
        return { zodSchema: "z.null()", refs: [] } as const;
      }
      case "string": {
        if (schema.enum) {
          const literals = JSON.stringify(schema.enum);
          return { zodSchema: `z.literal(${literals})`, refs: [] } as const;
        }
        if (schema.format === "uri") {
          return { zodSchema: "z.url()", refs: [] } as const;
        }
        if (schema.format === "date-time") {
          return { zodSchema: "z.iso.datetime()", refs: [] } as const;
        }
        let schemaStr = "z.string()";
        if (schema.minLength !== undefined) {
          schemaStr += `.check(z.minLength(${schema.minLength}))`;
        }
        if (schema.maxLength !== undefined) {
          schemaStr += `.check(z.maxLength(${schema.maxLength}))`;
        }
        return { zodSchema: schemaStr, refs: [] } as const;
      }
      case "string:nullable": {
        return { zodSchema: "z.nullable(z.string())", refs: [] } as const;
      }
      case "enum:number": {
        const literals = schema.enum.map((v) => JSON.stringify(v)).join(", ");
        return { zodSchema: `z.literal([${literals}])`, refs: [] } as const;
      }
      case "integer": {
        let schemaStr = "z.int()";
        if (schema.minimum !== undefined && schema.maximum !== undefined) {
          const diff = schema.maximum - schema.minimum;
          if (diff <= 10) {
            const values: number[] = [];
            for (let i = schema.minimum; i <= schema.maximum; i++) {
              values.push(i);
            }
            const literals = values.join(", ");
            return { zodSchema: `z.literal([${literals}])`, refs: [] } as const;
          }
        }
        if (schema.minimum !== undefined) {
          schemaStr += `.check(z.minimum(${schema.minimum}))`;
        }
        if (schema.maximum !== undefined) {
          schemaStr += `.check(z.maximum(${schema.maximum}))`;
        }
        return { zodSchema: schemaStr, refs: [] } as const;
      }
      case "integer:nullable": {
        return { zodSchema: "z.nullable(z.int())", refs: [] } as const;
      }
      case "number": {
        let schemaStr = "z.number()";
        if (schema.minimum !== undefined) {
          schemaStr += `.check(z.minimum(${schema.minimum}))`;
        }
        if (schema.maximum !== undefined) {
          schemaStr += `.check(z.maximum(${schema.maximum}))`;
        }
        return { zodSchema: schemaStr, refs: [] } as const;
      }
      case "boolean": {
        return { zodSchema: "z.boolean()", refs: [] } as const;
      }
      case "additionalProperties": {
        const { zodSchema: valueSchemaStr, refs } = convertToZod(
          parseUnparsed(schema.additionalProperties),
          prefix,
        );
        return {
          zodSchema: `z.record(z.string(), ${valueSchemaStr})`,
          refs,
        } as const;
      }
      case "object": {
        const props = schema.properties || {};
        const required = new Set(schema.required || []);
        const zodProps: Record<string, string> = {};
        const allRefs = new Set<string>();
        for (const [k, v] of Object.entries(props)) {
          const { zodSchema: sch, refs: propRefs } = convertToZod(
            parseUnparsed(v),
            prefix,
          );
          propRefs.forEach((r) => void allRefs.add(r));
          let propStr = sch;
          if (!required.has(k)) {
            propStr = `z.optional(${propStr})`;
          }
          zodProps[k] = propStr;
        }
        const inner = recordToObject(zodProps);
        return {
          zodSchema: `z.object(${inner})`,
          refs: Array.from(allRefs),
        } as const;
      }
      case "array": {
        const items = schema.items;
        if (!items) {
          return { zodSchema: "z.array(z.unknown())", refs: [] } as const;
        }
        const { zodSchema: itemSchema, refs: itemRefs } = convertToZod(
          parseUnparsed(items),
          prefix,
        );
        let zodSchemaStr: string;
        if (
          schema.minItems !== undefined &&
          schema.maxItems !== undefined &&
          schema.minItems === schema.maxItems &&
          schema.minItems <= 10
        ) {
          const n = schema.minItems;
          const tupleItems = Array(n).fill(itemSchema).join(", ");
          zodSchemaStr = `z.tuple([${tupleItems}])`;
        } else {
          let inner = `z.array(${itemSchema})`;
          if (
            schema.minItems !== undefined &&
            schema.maxItems !== undefined &&
            schema.minItems === schema.maxItems
          ) {
            inner += `.length(${schema.minItems})`;
          } else {
            if (schema.minItems !== undefined) {
              inner += `.check(z.minLength(${schema.minItems}))`;
            }
            if (schema.maxItems !== undefined) {
              inner += `.check(z.maxLength(${schema.maxItems}))`;
            }
          }
          zodSchemaStr = inner;
        }
        return { zodSchema: zodSchemaStr, refs: itemRefs } as const;
      }
      case "unknown": {
        return { zodSchema: "z.unknown()", refs: [] } as const;
      }
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.error(`Error while converting '${schema.__schema}'`);
      console.error(schema);
      console.error(JSON.stringify(schema, null, 2));
      console.error(z.prettifyError(e));
    }
    throw e;
  }

  assertNever(schema);
}

function assertNever(schema: never): never {
  throw new Error(`Unknown schema: ${JSON.stringify(schema)}`);
}

export type { Schema };
export {
  assertNever,
  convertToZod,
  QueryParamSchemaSchema,
  recordToObject,
  refToName,
  SchemaSchema,
  SchemaSchemaRef,
  StringYamlRef,
};
