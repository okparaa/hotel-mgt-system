import { eq } from "drizzle-orm";
import { deductions, users } from "../db/schemas";
import { Context } from "../types/context";

export const typeDef = /* GraphQL */ `
  type Deduction {
    id: ID!
    amount: String
    user: User
    ddate: String
    reason: String
    deleted: Boolean
    syn: Boolean
  }
  type Query {
    deduction(id: ID!): Deduction
  }
  type Mutation {
    deduct(deduct: DeductInput!): Deduction
    eDeduct(deduct: DeductInput!): Deduction
  }
  input DeductInput {
    userId: String!
    amount: String
    reason: String
    ddate: String
  }
`;

export const resolvers = {
  Query: {
    deduction: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .select()
        .from(deductions)
        .where(eq(deductions.id, args.id));
    },
  },
  Mutation: {
    deduct: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .insert(deductions)
        .values({ ...args.deduct })
        .returning();
    },
    eDeduct: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .update(deductions)
        .set({ reason: args.deduct.reason, amount: args.deduct.amount })
        .where(eq(deductions.userId, args.deduct.userId))
        .returning();
    },
  },
  Deduction: {
    user: async (parent: any, args: any, ctx: Context) => {
      const [result] = await ctx.db
        .select()
        .from(users)
        .where(eq(users.id, parent.userId));
      return result;
    },
  },
};
