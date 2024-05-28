import { eq } from "drizzle-orm";
import { Context } from "../types/context";
import { stores } from "../db/schemas";
import { createStore } from "../resolvers/stores/create-store";
import { updateStore } from "../resolvers/stores/update-store";

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
    stores: [Store]
    subStore(routeId: String!): [Store]
  }
  type Mutation {
    updateStore(store: UpdateStoreInput): Store
    createStore(store: CreateStoreInput): Store
    removeStore(id: ID!): Store
  }
  input CreateStoreInput {
    userId: String
    itemId: String
    routeId: String
    qtyReq: Float
    createdAt: String
  }

  input UpdateStoreInput {
    id: ID!
    qty: Float
    updatedAt: String
  }
`;
export const resolvers = {
  Query: {
    store: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db.select().from(stores).where(eq(stores.id, args.id));
    },
    stores: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db.select().from(stores);
    },
    subStore: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .select()
        .from(stores)
        .where(eq(stores.routeId, args.routeId));
    },
  },
  Mutation: {
    createStore: async (parent: any, args: any, ctx: Context) => {
      return await createStore(parent, args, ctx);
    },
    updateStore: async (parent: any, args: any, ctx: Context) => {
      return await updateStore(parent, args, ctx);
    },
  },
  Store: {},
};
