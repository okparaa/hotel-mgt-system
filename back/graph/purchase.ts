import { asc, eq, getTableColumns, sql } from "drizzle-orm";
import { Context } from "../types/context";
import { purchases, items } from "../db/schemas";
import { itemColumns } from "../helpers";
import { createPurchase } from "../resolvers/purchases/create-purchase";
import { updatePurchase } from "../resolvers/purchases/update-purchase";
import { removePurchase } from "../resolvers/purchases/remove-purchase";

export const typeDef = /* GraphQL */ `
  type Purchase {
    id: ID!
    priceBought: Float
    qtyBought: Float
    section: Section
    user: User
    item: Item
    createdAt: String
    updatedAt: String
    userId: String
    syn: Boolean
    deleted: Boolean
  }

  type PurchaseDate {
    id: ID!
    createdAt: String
  }

  type Query {
    purchase(id: ID!): Purchase
    purchases(date: String): [Purchase]
    dates: [PurchaseDate]
  }

  type Mutation {
    createPurchase(purchase: NewPurchaseInput): [Purchase]
    updatePurchase(purchase: EPurchaseInput): Purchase
    removePurchase(id: ID!, itemId: String): Purchase
  }

  input NewPurchaseInput {
    hash: String
    items: [PurchaseItem]
  }

  input EPurchaseInput {
    id: ID!
    priceBought: Float
    qtyBought: Float
    itemId: String
    createdAt: String
  }

  input PurchaseItem {
    priceBought: Float
    qtyBought: Float
    itemId: String
    createdAt: String
    userId: String
  }
`;
export const resolvers = {
  Query: {
    purchase: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db.query.purchases.findFirst({
        where: eq(purchases.id, args.id),
      });
    },
    purchases: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .select()
        .from(purchases)
        .where(eq(purchases.createdAt, args.date))
        .orderBy(asc(purchases.updatedAt));
    },
    dates: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .selectDistinctOn([purchases.createdAt])
        .from(purchases);
    },
  },
  Mutation: {
    createPurchase: async (parent: any, args: any, ctx: Context) => {
      return await createPurchase(parent, args, ctx);
    },
    removePurchase: async (parent: any, args: any, ctx: Context) => {
      return await removePurchase(parent, args, ctx);
    },
    updatePurchase: async (parent: any, args: any, ctx: Context) => {
      return await updatePurchase(parent, args, ctx);
    },
  },
  Purchase: {
    item: async (parent: any, args: any, ctx: Context) => {
      const [data] = await ctx.db
        .select(itemColumns)
        .from(items)
        .where(eq(items.id, parent.itemId));
      return data;
    },
  },
};
