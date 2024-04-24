import { render } from "preact";
import "./index.css";
import App from "./app.tsx";
import client from "./client.ts";
import { Provider } from "urql";
import AppProvider from "./app-chest.tsx";

render(
  <Provider value={client}>
    <AppProvider>
      <App />
    </AppProvider>
  </Provider>,
  document.getElementById("app")!
);
