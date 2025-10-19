import { defineConfig } from "tsdown";

export default defineConfig({
  entry: { index: "src/index.ts" },
  exports: true,
  unbundle: true,
  dts: true,
});
