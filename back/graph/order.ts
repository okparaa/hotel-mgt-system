import { eq, getTableColumns, sql } from "drizzle-orm";
import { Context } from "../types/context";
import { items, orders } from "../db/schemas";
import { createNewOrder } from "../resolvers/orders/new-order";
import { itemColumns } from "../helpers";

export const typeDef = /* GraphQL */ `
  type Order {
    id: ID!
    price: String
    customerEmail: String
    name: String
    customerPhone: String
    qty: String
    user: User
    amount: String
    item: [Item]
    syn: Boolean
    status: String
    createdAt: String
    updatedAt: String
  }
  type Query {
    order(id: ID!): Order
    orders: [Order]
    mini_search: String
  }
  type Mutation {
    newOrder(order: NewOrderInput): Order
    eOrder(order: OrderInput): Order
    dOrder(id: ID!): Order
  }

  input NewOrderInput {
    price: String
    customerEmail: String
    customerPhone: String
    itemId: String
    orderId: String
    qty: String
  }

  input OrderInput {
    price: String
    customerEmail: String
    customerPhone: String
    itemId: String
    orderId: String
    qty: String
  }
`;

export const resolvers = {
  Query: {
    order: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db.select().from(orders).where(eq(orders.id, args.id));
    },
    orders: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db.select().from(orders);
    },
  },
  Mutation: {
    newOrder: async (parent: any, args: any, ctx: Context) => {
      console.log(args);
      return await createNewOrder(parent, args, ctx);
    },
  },
  Order: {
    item: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .select(itemColumns)
        .from(items)
        .where(eq(parent.itemId, items.id));
    },
  },
};
