import schema from "./urql-schema.json";
import { Variables, offlineExchange } from "@urql/exchange-graphcache";
import { makeDefaultStorage } from "@urql/exchange-graphcache/default-storage";
import { createClient, fetchExchange } from "urql";
import { getToken, refreshAuth } from "./lib/auth";
import { authExchange } from "@urql/exchange-auth";
import { Cache } from "@urql/exchange-graphcache";

const storage = makeDefaultStorage({
  idbName: "__aio__",
  maxAge: 7, // The maximum age of the persisted data in days
});

const cache = offlineExchange({
  schema,
  storage,
  updates: {},
  optimistic: {
    roomPrice: (variables) => {
      return optimisticRes(variables, "Room");
    },
    salary: (variables) => {
      return optimisticRes(variables, "User");
    },
  },
});

const optimisticRes = (variables: Variables, typename: string) => {
  console.log(variables, "optim");
  return {
    ...variables,
    __typename: typename,
    syn: false,
  };
};
export const invalidateCache = (cache: Cache, typename: string, id: string) =>
  id
    ? cache.invalidate({ __typename: typename, id: id })
    : cache
        .inspectFields("Query")
        .filter((field) => field.fieldName === typename)
        .forEach((field) => {
          cache.invalidate("Query", field.fieldKey);
        });

export const updateCache = (
  data: any,
  cache: Cache,
  root_query_collection: string
) => {
  const res = cache.resolve("Query", root_query_collection);
  if (Array.isArray(res)) {
    cache.link("Query", root_query_collection, [...res, data]);
  }
};

const client = createClient({
  url: "http://localhost:5100/api",
  requestPolicy: "cache-and-network",
  exchanges: [
    cache,
    authExchange(async (utils) => {
      const token = getToken();
      return {
        addAuthToOperation(operation) {
          if (token) {
            return utils.appendHeaders(operation, {
              Authorization: `${token}`,
            });
          }
          return operation;
        },
        didAuthError(error, _operation) {
          // check if the error was an auth error
          // this can be implemented in various ways, e.g. 401 or a special error code
          return error.graphQLErrors.some(
            (e) => e.extensions?.code === "FORBIDDEN"
          );
        },
        willAuthError(_operation) {
          // e.g. check for expiration, existence of auth etc
          return !token;
        },
        refreshAuth,
      };
    }),
    fetchExchange,
  ],
  fetchOptions: () => {
    const token = localStorage.getItem("token");
    return {
      headers: { authorization: token ? `${token}` : "" },
    };
  },
});

export default client;
