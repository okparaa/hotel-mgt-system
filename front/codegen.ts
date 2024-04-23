import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:5100/api",
  documents: ["src/**/*.{js,ts,tsx,jsx}"],
  generates: {
    "./src/components/aio-urql.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
      config: {
        minify: true,
      },
    },
  },
};

export default config;
