import { Context } from "../types/context";
import { purchases, items, orders } from "../db/schemas";
import { eq, desc, sql } from "drizzle-orm";
import { updateItem } from "../resolvers/items/update-item";
import { itemColumns } from "../helpers";
import { createItem } from "../resolvers/items/create-item";
import { createFakeItems } from "../faker";

export const typeDef = /* GraphQL */ `
  type Item {
    id: ID!
    name: String!
    sku: String
    type: String
    price: Float
    description: String
    createdAt: String
    updatedAt: String
    orders: [Order]
    syn: Boolean
    deleted: Boolean
    qtyBought: Int
    qtySold: Int
    purchases: [Purchase]
  }
  type Query {
    item(id: ID!): Item
    items: [Item]
    itemsChart: [Item]
    search: String
    store: [String]
  }
  type Mutation {
    createItem(item: NewItemInput!): Item
    updateItem(item: ItemInput!): Item
    removeItem(id: ID!): Item
    itemPrice(id: ID, price: String): Item
  }
  input NewItemInput {
    name: String
    description: String
    type: String
    sku: String
    price: Float
  }
  input ItemInput {
    id: ID!
    name: String
    description: String
    type: String
    sku: String
    price: Float
  }
`;
export const resolvers = {
  Query: {
    item: async (parent: any, args: any, ctx: Context) => {
      const [data] = await ctx.db
        .select(itemColumns)
        .from(items)
        .where(eq(items.id, args.id));
      return data;
    },
    items: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db.select(itemColumns).from(items).orderBy(items.name);
    },
    itemsChart: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .select({
          ...itemColumns,
          name: sql<string>`lower(${items.name})`,
          qtyBought: sql<number>`${items.qtyBought}-${items.qtySold}`,
        })
        .from(items)
        .orderBy(desc(items.qtyBought));
    },
  },
  Mutation: {
    updateItem: async (parent: any, args: any, ctx: Context) => {
      return await updateItem(parent, args, ctx);
    },
    createItem: async (parent: any, args: any, ctx: Context) => {
      for (let i = 1; i < 27; i++) {
        const item = createFakeItems();
        await createItem(parent, { item }, ctx);
      }
      return await createItem(parent, args, ctx);
    },
    removeItem: async (parent: any, args: any, ctx: Context) => {
      const [data] = await ctx.db
        .update(items)
        .set({ deleted: true })
        .where(eq(items.id, args.id))
        .returning();
      return data;
    },
    itemPrice: async (parent: any, args: any, ctx: Context) => {
      const [data] = await ctx.db
        .update(items)
        .set({ price: args.price })
        .where(eq(items.id, args.id))
        .returning();
      return data;
    },
  },
  Item: {
    orders: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db.select().from(orders).where(eq(parent.id, orders.id));
    },
    purchases: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .select()
        .from(purchases)
        .where(eq(parent.id, purchases.itemId));
    },
  },
};
