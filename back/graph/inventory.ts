import { asc, eq, getTableColumns, sql } from "drizzle-orm";
import { Context } from "../types/context";
import { inventories, items } from "../db/schemas";
import { createNewInventory } from "../resolvers/inventories/new-inventory";
import { editInventory } from "../resolvers/inventories/edit-inventory";
import { itemColumns } from "../helpers";
import { removeInventory } from "../resolvers/inventories/del-inventory";

export const typeDef = /* GraphQL */ `
  type Inventory {
    id: ID!
    priceBought: Float
    qtyBought: String
    section: Section
    user: User
    item: Item
    createdAt: String
    updatedAt: String
    syn: Boolean
    deleted: Boolean
  }
  type InventoryDate {
    id: ID!
    createdAt: String
  }
  type Query {
    inventory(id: ID!): Inventory
    inventories(date: String): [Inventory]
    dates: [InventoryDate]
  }
  type Mutation {
    newInventory(inventory: NewInventoryInput): Inventory
    eInventory(inventory: EInventoryInput): Inventory
    dInventory(id: ID!, itemId: String): Inventory
  }
  input NewInventoryInput {
    priceBought: String
    qtyBought: String
    userId: String
    itemId: String
    sectionId: String
    createdAt: String
  }
  input EInventoryInput {
    id: ID!
    priceBought: String
    qtyBought: String
    itemId: String
    createdAt: String
  }
`;
export const resolvers = {
  Query: {
    inventory: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db.query.inventories.findFirst({
        where: eq(inventories.id, args.id),
      });
    },
    inventories: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .select()
        .from(inventories)
        .where(eq(inventories.createdAt, args.date))
        .orderBy(asc(inventories.updatedAt));
    },
    dates: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .selectDistinctOn([inventories.createdAt])
        .from(inventories);
    },
  },
  Mutation: {
    newInventory: async (parent: any, args: any, ctx: Context) => {
      return await createNewInventory(parent, args, ctx);
    },
    dInventory: async (parent: any, args: any, ctx: Context) => {
      return await removeInventory(parent, args, ctx);
    },
    eInventory: async (parent: any, args: any, ctx: Context) => {
      return await editInventory(parent, args, ctx);
    },
  },
  Inventory: {
    item: async (parent: any, args: any, ctx: Context) => {
      const [data] = await ctx.db
        .select(itemColumns)
        .from(items)
        .where(eq(items.id, parent.itemId));
      return data;
    },
  },
};
