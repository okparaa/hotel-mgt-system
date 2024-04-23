const { getIntrospectionQuery } = require("graphql");
const fs = require("fs");
const {
  getIntrospectedSchema,
  minifyIntrospectionQuery,
} = require("@urql/introspection");

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
    fs.writeFileSync("./ischema.json", JSON.stringify(minified));
  });
