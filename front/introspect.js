import { getIntrospectionQuery } from "graphql";
import * as fs from "fs";
import {
  getIntrospectedSchema,
  minifyIntrospectionQuery,
} from "@urql/introspection";

fetch("http://localhost:5100/api", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    variables: {},
    query: getIntrospectionQuery({ descriptions: false }),
  }),
})
  .then((result) => result.json())
  .then(({ data }) => {
    const minified = minifyIntrospectionQuery(getIntrospectedSchema(data));
    fs.writeFileSync("./src/urql-schema.json", JSON.stringify(minified));
  });
