import { render } from "preact";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/client.ts";
import App from "./app.tsx";
import React from "preact/compat";

render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("app")!
);
