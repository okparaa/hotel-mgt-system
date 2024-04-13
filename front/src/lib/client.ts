import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
  makeVar,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { decodeSession, parseUser } from "./utils";
import { persistCache, LocalForageWrapper } from "apollo3-cache-persist";
import * as localStore from "./localStore";
// import SerializingLink from "apollo-link-serialize";
import QueueLink from "apollo-link-queue";

const queueLink = new QueueLink();

// const serializeLink = new SerializingLink();

const roundTripLink = new ApolloLink((operation, forward) => {
  operation.setContext({ start: new Date() });
  return forward(operation).map((data) => {
    const now = new Date();
    const time = +now - operation.getContext().start;
    console.log(
      `Operation ${operation.operationName} took ${time}ms to complete`
    );
    return data;
  });
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraghQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: any) => ({
    headers: {
      authorization: localStorage.getItem("token"),
      ...headers,
    },
  }));
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: "http://localhost:5100/api",
  credentials: "include",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:5100/api",
    connectionParams: {
      authToken: localStorage.getItem("token") || "",
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  from([queueLink, roundTripLink, errorLink, authLink, httpLink])
);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        session: {
          read() {
            return uSession();
          },
        },
        cur_user: {
          read() {
            return curUser();
          },
        },
        store: {
          read() {
            return store();
          },
        },
        order_items: {
          read: () => {
            return orderItems();
          },
        },
        search: {
          read() {
            return search();
          },
        },
        mini_search: {
          read() {
            return miniSearch();
          },
        },
      },
    },
  },
});

await persistCache({
  cache,
  storage: new LocalForageWrapper(localStore),
});

export const store = makeVar({});
export const search = makeVar("");
export const miniSearch = makeVar("");
export const orderItems = makeVar({
  hash: "",
  cash: 0,
  txfa: 0,
  pos: 0,
  total: "",
  items: [],
} as any);
export const curUser = makeVar(parseUser());
export const uSession = makeVar(
  decodeSession(localStorage.getItem("token") || "")
);
export const client = new ApolloClient({
  link: splitLink,
  cache,
  connectToDevTools: true,
});
