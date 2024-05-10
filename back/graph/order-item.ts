import { eq } from "drizzle-orm";
import { items, orders } from "../db/schemas";
import { newOrderItems } from "../resolvers/order-item/new-order-item";
import { Context } from "../types/context";

export const typeDef = /* GraphQL */ `
  type OrderItem {
    id: ID!
    priceSold: Float
    qtySold: Int
    order: Order
    items: [Item]
    syn: Boolean
  }
  type Query {
    order_items: [String]
  }
  type Mutation {
    eOrderItem(id: ID): OrderItem
    newOrderItems(
      orderItems: [NewOrderItemInput!]
      pos: Int
      txfa: Int
      cash: Int
    ): [OrderItem]
  }
  input NewOrderItemInput {
    userId: String
    itemId: String
    qtySold: Int
    priceSold: Float
    name: String
    sku: String
    hash: String
  }
`;

export const resolvers = {
  Query: {},
  Mutation: {
    newOrderItems: async (parent: any, args: any, ctx: Context) => {
      return await newOrderItems(parent, args, ctx);
    },
  },
  OrderItem: {
    order: async (parent: any, args: any, ctx: Context) => {
      const [data] = await ctx.db
        .select()
        .from(orders)
        .where(eq(orders.id, parent.orderId));
      return data;
    },
    items: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .select()
        .from(items)
        .where(eq(parent.itemId, items.id));
    },
  },
};
