import * as z from "zod";
import type { QueryParamSchemaSchema, Schema } from "./shared";
import {
  assertNever,
  convertToZod,
  OperationParameterBase,
  OperationQueryParameterSchema,
  recordToObject,
  refToName,
  SchemaSchema,
  SchemaSchemaBoolean,
  SchemaSchemaPrimitive,
  SchemaSchemaRef,
  SchemaSchemaRefToPrimitive,
} from "./shared";

const Semver = z.string().brand("Semver");

const OpenApiSchemaInfo = z.object({
  version: Semver,
  title: z.string(),
  contact: z.object({
    name: z.string(),
    url: z.url(),
    email: z.email(),
  }),
  "x-logo": z.object({ url: z.url() }),
  license: z.object({
    name: z.string(),
    url: z.url(),
  }),
  description: z.string(),
});

const OpenApiSchemaPath = z.string().brand("OpenApiSchemaPath");

const OpenApiSchemaPaths = z.record(OpenApiSchemaPath, SchemaSchemaRef);

const OpenApiSchemaComponents = z.object();

const OpenApiServersSchema = z.tuple([
  z.object({ url: z.literal("https://lichess.org") }),
  z.object({ url: z.literal("https://lichess.dev") }),
  z.object({ url: z.literal("http://localhost:{port}") }),
  z.object({ url: z.literal("http://l.org") }),
]);

const OpenApiSchemaSchema = z.object({
  openapi: z.literal("3.1.0"),
  info: OpenApiSchemaInfo,
  servers: OpenApiServersSchema,
  tags: z.array(z.object({ name: z.string(), description: z.string() })),
  paths: OpenApiSchemaPaths,
  components: OpenApiSchemaComponents,
});

type OpenApiSchema = z.infer<typeof OpenApiSchemaSchema>;

const AccessTokenScopeSchemaRead = z.literal([
  "email:read",
  "preference:read",
  "challenge:read",
  "puzzle:read",
  "follow:read",
  "team:read",
  "study:read",
  "engine:read",
]);

const AccessTokenScopeSchemaWrite = z.literal([
  "preference:write",
  "challenge:write",
  "tournament:write",
  "puzzle:write",
  "racer:write",
  "follow:write",
  "msg:write",
  "team:write",
  "study:write",
  "engine:write",
]);

const AccessTokenScopeSchema = z.union([
  AccessTokenScopeSchemaRead,
  AccessTokenScopeSchemaWrite,
  z.literal(["team:lead", "challenge:bulk", "bot:play", "board:play"]),
]);

const OAuth2Scope = z.union([AccessTokenScopeSchema, z.literal(["web:mod"])]);

const OAuth2Schema = z.object({ OAuth2: z.array(OAuth2Scope) });

const SecuritySchema = z.union([
  z.array(AccessTokenScopeSchema),
  z.union([
    z.tuple([OAuth2Schema]),
    z.tuple([z.strictObject({}), OAuth2Schema]),
  ]),
]);

const StringJsonRef = z
  .templateLiteral([z.string(), ".json"])
  .brand("StringJsonRef");

const SchemaSchemaExampleRef = z
  .strictObject({ $ref: StringJsonRef })
  .transform((s) => ({ ...s, __schema: "$ref" as const }));

const ResponseContentBaseContent = z.object({
  schema: SchemaSchema,
  example: SchemaSchemaExampleRef.optional(),
  examples: z
    .record(
      z.string(),
      z.union([SchemaSchemaRef, z.object({ value: z.json() })]),
    )
    .optional(),
});

const ResponseContextPlainTextContent = ResponseContentBaseContent.extend({})
  .strict()
  .transform((x) => ({ ...x, __content: "text" as const }));

const ResponseContentJsonContent = ResponseContentBaseContent.extend({})
  .strict()
  .transform((x) => ({ ...x, __content: "json" as const }));

const ResponseContentNdjsonContent = ResponseContentBaseContent.extend({})
  .strict()
  .transform((x) => ({ ...x, __content: "ndjson" as const }));

const ResponseContentChessPgnContent = ResponseContentBaseContent.extend({})
  .strict()
  .transform((x) => ({ ...x, __content: "chess-pgn" as const }));

const ResponseContentJson = z
  .union([
    z
      .strictObject({ "application/json": ResponseContentJsonContent })
      .transform((x) => x["application/json"]),
    z
      .strictObject({
        "application/vnd.lichess.v3+json": ResponseContentJsonContent,
      })
      .transform((x) => x["application/vnd.lichess.v3+json"]),
  ])
  .transform((x) => ({ ...x, __content_type: "json" as const }));

const ResponseContentNdjson = z
  .strictObject({ "application/x-ndjson": ResponseContentNdjsonContent })
  .transform((x) => x["application/x-ndjson"])
  .transform((x) => ({ ...x, __content_type: "ndjson" as const }));

const ResponseContentChessPgn = z
  .strictObject({ "application/x-chess-pgn": ResponseContentChessPgnContent })
  .transform((x) => x["application/x-chess-pgn"])
  .transform((x) => ({ ...x, __content_type: "chess-pgn" as const }));

const ResponseContentMixed = z
  .strictObject({
    "text/plain": ResponseContextPlainTextContent.optional(),
    "application/json": ResponseContentJsonContent.optional(),
    "application/vnd.lichess.v3+json": ResponseContentJsonContent.optional(),
    "application/x-chess-pgn": ResponseContentChessPgnContent.optional(),
    "application/x-ndjson": ResponseContentNdjsonContent.optional(),
  })
  .transform((x) => ({ ...x, __content_type: "mixed" as const }));

const ResponseContentNoContent = z
  .undefined()
  .optional()
  .transform(() => ({ __content_type: "nocontent" as const }));

const ResponseContent = z.union([
  ResponseContentJson,
  ResponseContentNdjson,
  ResponseContentChessPgn,
  ResponseContentMixed,
  ResponseContentNoContent,
]);

const ResponseSchemaHeaders = z.strictObject({
  "Access-Control-Allow-Origin": z.strictObject({
    schema: z.object({
      type: z.literal("string"),
      default: z.literal("'*'"),
    }),
  }),
  "Last-Modified": z
    .strictObject({
      schema: z.object({
        type: z.literal("string"),
        example: z.string(),
      }),
    })
    .optional(),
});

const ResponseSchema = z.strictObject({
  description: z.string(),
  headers: ResponseSchemaHeaders.optional(),
  content: ResponseContent,
});

const SchemaSchemaBooleanLike = z
  .strictObject({
    anyOf: z.tuple([
      SchemaSchemaBoolean,
      z.object({ type: z.literal("string"), const: z.literal("yes") }),
    ]),
    example: z.literal("yes"),
  })
  .transform((s) => ({ ...s, __schema: "boolean-like" as const }))
  .brand("SchemaSchemaBooleanLike");

type QueryParamSchema = z.infer<typeof QueryParamSchemaSchema>;

type OperationQueryParameter = z.infer<typeof OperationQueryParameterSchema>;

const PathParamSchemaSchema = z.union([
  SchemaSchemaPrimitive,
  SchemaSchemaRefToPrimitive,
  SchemaSchemaBooleanLike,
]);

type PathParamSchema = z.infer<typeof PathParamSchemaSchema>;

const OperationPathParameterSchema = OperationParameterBase.extend({
  in: z.literal("path"),
  required: z.literal(true),
  schema: PathParamSchemaSchema,
})
  .strict()
  .transform((s) => ({ ...s, __type: "path" as const }));

type OperationPathParameter = z.infer<typeof OperationPathParameterSchema>;

const OperationParameterRefSchema = z
  .object({ $ref: z.string() })
  .transform((s) => ({ ...s, __type: "$ref" as const }));

const OperationParameter = z.union([
  OperationQueryParameterSchema,
  OperationPathParameterSchema,
  OperationParameterRefSchema,
]);
const OperationParameters = z.array(OperationParameter).optional();
type OperationParameters = z.infer<typeof OperationParameters>;

const ResponseStatus = z.string();

const OperationResponses = z.record(ResponseStatus, ResponseSchema);

const LichessServerSchema = z.union([
  z.object({
    url: z.literal([
      "https://engine.lichess.ovh",
      "https://explorer.lichess.org",
      "https://tablebase.lichess.org",
    ]),
  }),
  z.object({
    url: z.literal("http://localhost:{port}"),
    variables: z.object({ port: z.object({ default: z.string() }) }),
  }),
]);

const LichessServersSchema = z
  .tuple([LichessServerSchema])
  .rest(LichessServerSchema)
  .transform((s) => ({ url: s[0].url, __id: "__servers" as const }));

const BaseTagSchemaOperation = z.object({
  operationId: z.string(),
  summary: z.string(),
  description: z.string(),
  servers: LichessServersSchema.optional(),
  tags: z.array(z.string()),
  security: SecuritySchema,
  parameters: OperationParameters,
  responses: OperationResponses,
});

const RequestBodyContentJson = z
  .strictObject({ "application/json": z.object({ schema: SchemaSchema }) })
  .transform((s) => ({ ...s, __type: "json" as const }));

const RequestBodyContentPlainText = z
  .strictObject({ "text/plain": z.object({ schema: SchemaSchema }) })
  .transform((s) => ({ ...s, __type: "text/plain" as const }));

const RequestBodyContentWebFormUrlEncoded = z
  .strictObject({
    "application/x-www-form-urlencoded": z.object({ schema: SchemaSchema }),
  })
  .transform((s) => ({ ...s, __type: "x-www-form-urlencoded" as const }));

const RequestBodyContent = z.union([
  RequestBodyContentJson,
  RequestBodyContentPlainText,
  RequestBodyContentWebFormUrlEncoded,
]);

const RequestBodySchema = z.strictObject({
  description: z.string().optional(),
  required: z.boolean().optional(),
  content: RequestBodyContent,
});

const TagSchemaSchemaGet = BaseTagSchemaOperation.extend({})
  .strict()
  .transform((s) => ({ ...s, __id: "method:get", __method: "get" }) as const);

const TagSchemaSchemaPost = BaseTagSchemaOperation.extend({
  requestBody: RequestBodySchema.optional(),
})
  .strict()
  .transform((s) => ({ ...s, __id: "method:post", __method: "post" }) as const);

const TagSchemaSchemaHead = BaseTagSchemaOperation.extend({})
  .strict()
  .transform((s) => ({ ...s, __id: "method:head", __method: "head" }) as const);

const TagSchemaSchemaDelete = BaseTagSchemaOperation.extend({})
  .strict()
  .transform(
    (s) => ({ ...s, __id: "method:delete", __method: "delete" }) as const,
  );

const TagSchemaSchemaPut = BaseTagSchemaOperation.extend({
  requestBody: RequestBodySchema.optional(),
})
  .strict()
  .transform((s) => ({ ...s, __id: "method:put", __method: "put" }) as const);

const TagSchemaSchema = z
  .object({
    servers: LichessServersSchema.optional(),
    parameters: z
      .array(OperationPathParameterSchema)
      .transform((s) => ({ parameters: s, __id: "__parameters" as const }))
      .optional(),
    get: TagSchemaSchemaGet.optional(),
    post: TagSchemaSchemaPost.optional(),
    head: TagSchemaSchemaHead.optional(),
    delete: TagSchemaSchemaDelete.optional(),
    put: TagSchemaSchemaPut.optional(),
  })
  .strict();
type TagSchema = z.infer<typeof TagSchemaSchema>;

type Operation = NonNullable<TagSchema[keyof TagSchema]>;

function processMethod({
  method,
}: {
  method: Exclude<Operation, { __id: "__parameters" | "__servers" }>;
}) {
  const handlers: Record<number, string> = {};

  for (const [statusStr, resp] of Object.entries(method.responses)) {
    const status = Number(statusStr);
    const content = resp.content;
    switch (content.__content_type) {
      case "nocontent":
      case "mixed":
      case "chess-pgn": {
        handlers[status] = `{ kind: "${resp.content.__content_type}" }`;
        break;
      }
      case "json": {
        const { zodSchema } = convertToZod(content.schema, "schemas.");
        handlers[status] = `{ kind: "json", schema: ${zodSchema} }`;
        break;
      }
      case "ndjson": {
        const { zodSchema } = convertToZod(content.schema, "schemas.");
        handlers[status] = `{ kind: "ndjson", schema: ${zodSchema} }`;
        break;
      }
    }
  }

  switch (method.__method) {
    case "get":
    case "head":
    case "delete": {
      return {
        handlers,
        requestBody: undefined,
        requestBodySchema: null,
      } as const;
    }
    case "post":
    case "put": {
      const requestBody = method.requestBody;
      if (!requestBody) {
        return { handlers, requestBody, requestBodySchema: null } as const;
      }
      const requestBodyType = requestBody.content.__type;
      const requestBodySchema = (() => {
        switch (requestBodyType) {
          case "json": {
            return requestBody.content["application/json"].schema;
          }
          case "text/plain": {
            return requestBody.content["text/plain"].schema;
          }
          case "x-www-form-urlencoded": {
            return requestBody.content["application/x-www-form-urlencoded"]
              .schema;
          }
        }
        assertNever(requestBodyType);
      })();
      return { handlers, requestBody, requestBodySchema } as const;
    }
  }

  assertNever(method);
}

function processRawPath(rawApiPath: string) {
  const processedPath = rawApiPath.replaceAll("/{", "/${params.");
  const hasPathParams = rawApiPath.includes("{");
  return { processedPath, hasPathParams } as const;
}

function processParams(params: OperationParameters) {
  if (!params) {
    return {
      hasAnyParams: false,
      hasQueryParams: false,
      hasPathParams: false,
      hasQueryAndPathParams: false,
      hasOnlyQueryParams: false,
      hasOnlyPathParams: false,
    } as const;
  }

  const queryParams = params.filter((param) => param.__type === "query");
  const pathParams = params.filter((param) => param.__type === "path");
  const hasQueryParams = queryParams.length > 0;
  const hasPathParams = pathParams.length > 0;
  const hasQueryAndPathParams = hasQueryParams && hasPathParams;
  const hasOnlyQueryParams = hasQueryParams && !hasPathParams;
  const hasOnlyPathParams = hasPathParams && !hasQueryParams;

  return {
    hasAnyParams: true,
    hasPathParams,
    hasQueryParams,
    queryParams,
    pathParams,
    hasQueryAndPathParams,
    hasOnlyQueryParams,
    hasOnlyPathParams,
  } as const;
}

function schemaToTypescriptTypes(
  schema: Schema | PathParamSchema | QueryParamSchema,
) {
  switch (schema.__schema) {
    case "$ref":
    case "notverified:reftoprimitive": {
      const ref = schema.$ref;
      const name = refToName(ref);
      const typescriptSchema = `schemas.${name}` as const;
      return typescriptSchema;
    }
    case "notverified:reftoprimitive:nullable": {
      const ref = schema.allOf[0].$ref;
      const name = refToName(ref);
      const typescriptSchema = `schemas.${name} | null` as const;
      return typescriptSchema;
    }
    case "object": {
      const props = schema.properties || {};
      const required = new Set(schema.required || []);
      const objectRecord: Record<string, `: ${string}` | `?: ${string}`> = {};
      for (const [k, v] of Object.entries(props)) {
        const typescriptSchema = schemaToTypescriptTypes(SchemaSchema.parse(v));
        const propStr = required.has(k)
          ? (`: ${typescriptSchema}` as const)
          : (`?: ${typescriptSchema}` as const);
        objectRecord[k] = propStr;
      }
      return recordToObject(objectRecord, { colon: false });
    }
    case "boolean":
    case "boolean-like": {
      return "boolean" as const;
    }
    case "string": {
      if (schema.enum) {
        const literals = schema.enum.map((v) => JSON.stringify(v)).join(" | ");
        return `(${literals})` as const;
      }
      return "string" as const;
    }
    case "number":
    case "integer": {
      return "number" as const;
    }
    case "enum:number": {
      const literals = schema.enum.map((v) => JSON.stringify(v)).join(" | ");
      return `(${literals})` as const;
    }
    case "allOf": {
      const leftPart: string = schemaToTypescriptTypes(
        SchemaSchema.parse(schema.allOf[0]),
      );
      const rightPart: string = schemaToTypescriptTypes(
        SchemaSchema.parse(schema.allOf[1]),
      );
      return `${leftPart} & ${rightPart}` as const;
    }
    case "oneOf": {
      const typescriptSchemas: string = schema.oneOf
        .map((s) => schemaToTypescriptTypes(SchemaSchema.parse(s)))
        .join(" | ");
      return `(${typescriptSchemas})` as const;
    }
    case "array:primitive": {
      const typescriptSchema: string = schemaToTypescriptTypes(schema.items);
      return `(${typescriptSchema})[]` as const;
    }
    case "array:notverified:reftoprimitive": {
      const ref = schema.items.$ref;
      const name = refToName(ref);
      const typescriptSchema = `schemas.${name}` as const;
      return `(${typescriptSchema})[]` as const;
    }
    case "additionalProperties":
    case "anyOf":
    case "array":
    case "integer:nullable":
    case "null":
    case "string:nullable": {
      throw new Error("Unsupported schema");
    }
    case "unknown": {
      return "unknown" as const;
    }
  }

  assertNever(schema);
}

function extractQueryParams(queryParams: OperationQueryParameter[]) {
  const params: Record<string, string> = {};
  for (const param of queryParams) {
    const typescriptSchema = schemaToTypescriptTypes(param.schema);
    params[param.name] = param.required
      ? `: ${typescriptSchema}`
      : `?: ${typescriptSchema}`;
  }
  return recordToObject(params, { colon: false });
}

function extractPathParams(pathParams: OperationPathParameter[]) {
  const params: Record<string, string> = {};
  for (const param of pathParams) {
    params[param.name] = schemaToTypescriptTypes(param.schema);
  }
  return recordToObject(params);
}

function extractBodyTypes(bodySchema: Schema) {
  if (bodySchema.__schema === "string") {
    return "{ body: string }" as const;
  }
  const typescriptSchema = schemaToTypescriptTypes(bodySchema);
  return `{ body: ${typescriptSchema}} ` as const;
}

function toJsdoc(summary: string) {
  const jsdoc = `/**\n   * ${summary}\n   */` as const;
  return jsdoc;
}

function processOperation(
  operation: Operation,
  rawApiPath: string,
  options?: { sharedPathParams?: OperationPathParameter[]; baseUrl?: string },
) {
  if (operation.__id === "__parameters") {
    const parameters = operation.parameters;
    return { parameters, __type: "__parameters" } as const;
  }

  if (operation.__id === "__servers") {
    const baseUrl = operation.url;
    return { baseUrl, __type: "__servers" } as const;
  }

  const { processedPath, hasPathParams } = processRawPath(rawApiPath);
  const pathLiteral = hasPathParams
    ? `\`${processedPath}\``
    : `"${processedPath}"`;

  const jsdoc = toJsdoc(operation.summary);

  const { handlers, requestBodySchema } = processMethod({ method: operation });

  const paramsObj = processParams(
    (operation.parameters ?? []).concat(options?.sharedPathParams ?? []),
  );

  let paramsDecl = "";
  if (paramsObj.hasAnyParams || requestBodySchema) {
    const typeParts: string[] = [];

    if (paramsObj.hasPathParams) {
      typeParts.push(extractPathParams(paramsObj.pathParams));
    }
    if (paramsObj.hasQueryParams) {
      typeParts.push(extractQueryParams(paramsObj.queryParams));
    }
    if (requestBodySchema) {
      typeParts.push(extractBodyTypes(requestBodySchema));
    }

    if (typeParts.length === 0) {
      paramsDecl = "";
    } else {
      const combinedType =
        typeParts.length === 1 ? typeParts[0] : `(${typeParts.join(" & ")})`;
      paramsDecl = `params: ${combinedType}`;
    }
  }

  let requestObjCode = "{ path }";

  if (paramsObj.hasAnyParams || requestBodySchema) {
    const requestPieces: string[] = ["path"];

    if (paramsObj.hasOnlyQueryParams && !requestBodySchema) {
      requestPieces.push("query: params");
    } else if (paramsObj.hasQueryParams) {
      const queryFields = paramsObj.queryParams
        .map((p) => `${p.name}: params.${p.name}`)
        .join(", ");
      requestPieces.push(`query: { ${queryFields} }`);
    }

    if (requestBodySchema) {
      requestPieces.push("body: params.body");
    }

    requestObjCode = `${requestPieces.join(", ")}`;
  }

  const baseUrl = options?.baseUrl || operation.servers?.url;

  let baseUrlLine = "";
  let baseUrlArg = "";
  if (baseUrl) {
    baseUrlLine = `    const baseUrl = "${baseUrl}";\n`;
    baseUrlArg = ", baseUrl";
  }

  const handlersCode = Object.entries(handlers)
    .map(([status, def]) => `  ${status}: ${def}`)
    .join(",\n");

  const fullMethod = `
  ${jsdoc}
  async ${operation.operationId}(${paramsDecl}) {
    const path = ${pathLiteral};
${baseUrlLine}\
    return await this.requestor.${operation.__method}(
      { ${requestObjCode}${baseUrlArg} },
      { ${handlersCode} }
    );
  };`;

  return { methodCode: fullMethod, __type: "__methodCode" } as const;
}

function processTag(tagSchema: TagSchema, rawApiPath: string) {
  const methodsCode: string[] = [];
  let sharedPathParams: OperationPathParameter[] | undefined;
  let baseUrl: string | undefined;

  for (const operation of Object.values(tagSchema)) {
    const processedOperation = processOperation(operation, rawApiPath, {
      sharedPathParams,
      baseUrl,
    });
    if (processedOperation.__type === "__parameters") {
      sharedPathParams = processedOperation.parameters;
    } else if (processedOperation.__type === "__servers") {
      baseUrl = processedOperation.baseUrl;
    } else {
      methodsCode.push(processedOperation.methodCode);
    }
  }
  return methodsCode;
}

async function processSchema(schema: OpenApiSchema): Promise<void> {
  const tagsDir = "specs/tags" as const;

  const methodsCode: string[] = [];

  for (const [rawApiPath, pathItemSchema] of Object.entries(schema.paths)) {
    const tagPath = pathItemSchema.$ref.split("/").slice(2, 4).join("/");
    const fullYamlPath = `${tagsDir}/${tagPath}` as const;
    const yamlStr = await Bun.file(fullYamlPath).text();
    const schema = Bun.YAML.parse(yamlStr);
    const tagSchema = TagSchemaSchema.safeParse(schema);
    if (tagSchema.error) {
      console.error(`Error while parsing ${tagPath}`);
      console.error(z.prettifyError(tagSchema.error));
      throw tagSchema.error;
    }
    const newMethods = processTag(tagSchema.data, rawApiPath);
    methodsCode.push(...newMethods);
  }

  const methodsStr = methodsCode.join("\n");

  const API_URL = schema.servers[0].url;

  const clientCodeTs = `import * as z from "minizod";
import { Requestor } from "./lib/requestor";
import * as schemas from "./schemas";

const BASE_URL = "${API_URL}";

export class Lichess {
  private readonly requestor: Requestor;

  constructor(options: { token: string | null }) {
    const { token } = options;
    this.requestor = new Requestor({ token, baseUrl: BASE_URL });
  }

  ${methodsStr}
}
` as const;

  const clientCodePath = "src/index.ts" as const;

  Bun.write(clientCodePath, clientCodeTs);
}

async function main() {
  console.log("Generating client...");
  const filePath = "specs/lichess-api.yaml" as const;
  const yamlStr = await Bun.file(filePath).text();
  const yamlContent = Bun.YAML.parse(yamlStr);
  const parsedSchema = OpenApiSchemaSchema.parse(yamlContent);
  await processSchema(parsedSchema);
  console.log("Client generated");
}

await main();
