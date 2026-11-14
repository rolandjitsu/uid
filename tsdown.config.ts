import {defineConfig} from "tsdown";

export default defineConfig({
  entry: {
    index: "./src/index.ts"
  },
  format: ["esm", "cjs"],
  dts: {tsconfig: "./tsconfig.build.json"},
  target: "es2020",
  sourcemap: true,
  fixedExtension: false,
  hash: false,
  outputOptions: {
    exports: "named"
  }
});
