import { readdirSync } from "node:fs";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { ZodError } from "zod";
import { prettifyError } from "zod/mini";
import { convertToZod, refToName, SchemaSchema, StringYamlRef } from "./shared";

async function processFile(filePath: string) {
  const normalizedFilePath = filePath.replaceAll("\\", "/");
  const fileName = refToName(StringYamlRef.parse(normalizedFilePath));
  const yamlStr = await Bun.file(normalizedFilePath).text();
  const yamlContent = Bun.YAML.parse(yamlStr);
  const parsedSchema = SchemaSchema.safeParse(yamlContent);
  if (parsedSchema.error) {
    console.error(`Error while parsing ${normalizedFilePath}`);
    console.error(prettifyError(parsedSchema.error));
    throw parsedSchema.error;
  }
  const { zodSchema, refs } = (() => {
    try {
      return convertToZod(parsedSchema.data);
    } catch (e) {
      if (e instanceof ZodError) {
        console.error(`Error while converting ${normalizedFilePath}`);
        console.error(prettifyError(e));
      }
      throw e;
    }
  })();

  const refImports = refs
    .toSorted()
    .map((refName) => `import { ${refName} } from "./${refName}";` as const)
    .join("\n");
  const spacedRefImports = refImports
    ? (`\n${refImports}\n` as const)
    : ("" as const);

  const tsCode = `import * as z from "minizod";
${spacedRefImports}
const ${fileName} = ${zodSchema};

type ${fileName} = z.infer<typeof ${fileName}>;

export { ${fileName} };
` as const;

  const outDir = "src/schemas" as const;
  const outFilePath = `${outDir}/${fileName}.ts` as const;

  await Bun.write(outFilePath, tsCode);
}

async function main() {
  console.log("Generating schemas...");
  const outDir = "src/schemas" as const;
  await fs.rm(outDir, { recursive: true, force: true });
  const schemasDir = "specs/schemas" as const;
  const glob = new Bun.Glob(`${schemasDir}/*.{yaml}` as const);
  const yamlFiles = await Array.fromAsync(glob.scan());
  for (const fullPath of yamlFiles) {
    if (fullPath.includes("_index.yaml")) continue;
    await processFile(fullPath);
  }
  const tsFiles = readdirSync(outDir)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts")
    .map((file) => path.basename(file, ".ts"));

  const importLines = tsFiles.map(
    (name) => `export { ${name} } from "./schemas/${name}";` as const,
  );
  const content = importLines.join("\n");
  const outFile = "src/schemas.ts" as const;
  await Bun.write(outFile, content);
  console.log("Schemas generated");
}

await main();
