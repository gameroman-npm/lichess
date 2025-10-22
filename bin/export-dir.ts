import { readdirSync } from "fs";
import path from "path";

async function main() {
  const dir = "src/schemas";

  const tsFiles = readdirSync(dir)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts")
    .map((file) => path.basename(file, ".ts"));

  console.log(tsFiles);

  const importLines = tsFiles.map((name) => `import ${name} from "./${name}";`);
  const exportLine =
    tsFiles.length > 0 ? `export {\n  ${tsFiles.join(",\n  ")},\n};` : "";

  const content = `${importLines.join("\n")}\n\n${exportLine}`;

  await Bun.write(`${dir}/index.ts`, content);
}

await main();
