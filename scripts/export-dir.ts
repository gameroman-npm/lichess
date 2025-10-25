import { readdirSync } from "fs";
import path from "path";

async function main() {
  const dir = "src/schemas" as const;

  const tsFiles = readdirSync(dir)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts")
    .map((file) => path.basename(file, ".ts"));

  if (!tsFiles.length) {
    throw new Error("Empty dir");
  }

  console.log(tsFiles);

  const importLines = tsFiles.map(
    (name) => `import ${name} from "./${name}";` as const
  );
  const exportLine = `export {\n  ${tsFiles.join(",\n  ")},\n};` as const;

  const content = `${importLines.join("\n")}\n\n${exportLine}` as const;

  const outFile = `${dir}/index.ts` as const;

  await Bun.write(outFile, content);
}

await main();
