import { defineConfig } from "oxfmt";

export default defineConfig({
  ignorePatterns: ["dist/**", "node_modules/**", "public/**"],
  bracketSameLine: true,
  jsdoc: true,
  sortImports: true,
});
