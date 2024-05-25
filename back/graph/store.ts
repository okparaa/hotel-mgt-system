import { Context } from "../types/context";
export const typeDef = /* GraphQL */ `
  type Store {
    id: ID!
    item: Item
    user: User
    qty: Float
    qtyReq: Float
    syn: Boolean
    route: Route
    createdAt: String
    updateAt: String
    deleted: Boolean
  }
  type Query {
    store(id: ID!): Store
    routeStore(routeId: String!): [Store]
    stores: [Store]
  }
  type Mutation {
    updateStore(id: ID!, qty: Float): Store
    storeReq(itemId: String!, qtyReq: Float!): Store
    removeReq(id: ID!): Store
  }
`;
export const resolvers = {
  Query: {},
  Mutation: {},
  Store: {},
};
