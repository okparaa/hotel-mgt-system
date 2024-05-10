import { Context } from "../types/context";
import { inventories, items, orders } from "../db/schemas";
import { eq, desc, sql } from "drizzle-orm";
import { createNewItem } from "../resolvers/items/new-item";
import { updateItem } from "../resolvers/items/edit-item";
import { itemColumns } from "../helpers";

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
    inventories: [Inventory]
  }
  type Query {
    item(id: ID!): Item
    items: [Item]
    itemsChart: [Item]
    search: String
    store: [String]
  }
  type Mutation {
    newItem(item: NewItemInput!): Item
    eItem(item: ItemInput!): Item
    dItem(id: ID!): Item
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
    eItem: async (parent: any, args: any, ctx: Context) => {
      return await updateItem(parent, args, ctx);
    },
    newItem: async (parent: any, args: any, ctx: Context) => {
      return await createNewItem(parent, args, ctx);
    },
    dItem: async (parent: any, args: any, ctx: Context) => {
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
    inventories: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .select()
        .from(inventories)
        .where(eq(parent.id, inventories.itemId));
    },
  },
};
