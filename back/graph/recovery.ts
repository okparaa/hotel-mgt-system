import { eq } from "drizzle-orm";
import { Context } from "../types/context";
import { orders, users } from "../db/schemas";

export const typeDef = /* GraphQL */ `
  type Recovery {
    id: ID!
    user: User
    deleted: Boolean
    syn: Boolean
    pos: Float
    order: Order
    txfa: Float
    cash: Float
    createdAt: String
    updatedAt: String
    debitAmt: Float
    debitedAt: String
    debitAim: String
  }
`;

export const resolvers = {
  Query: {},
  Mutation: {},
  Recovery: {
    user: async (parent: any, args: any, ctx: Context) => {
      const [user] = await ctx.db
        .select()
        .from(users)
        .where(eq(parent.userId, users.id));
      return user;
    },
    order: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .select()
        .from(orders)
        .where(eq(orders.id, parent.orderId));
    },
  },
};
