import { CodegenConfig } from "@graphql-codegen/cli";
const config: CodegenConfig = {
  schema: "http://localhost:5100/api",
  documents: ["src/**/*.{js,jsx,ts,tsx}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;
