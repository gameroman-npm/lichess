import { defineConfig } from "tsdown";

export default defineConfig({
  entry: { index: "src/index.ts", schemas: "src/schemas.ts" },
  exports: true,
  dts: true,
  inputOptions: { experimental: { attachDebugInfo: "none" } },
  outputOptions: { minifyInternalExports: false },
});
