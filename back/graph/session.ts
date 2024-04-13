import { desc, eq } from "drizzle-orm";
import { Context } from "../types/context";
import { sessions } from "../db/schemas";
import { getUser } from "../helpers";

export const typeDef = /* GraphQL */ `
  type Session {
    id: ID!
    refreshToken: String
    auth: String
    ver: String
    iat: String
    exp: String
    accessToken: String
    createdAt: String
    updatedAt: String
    kode: String
    valid: Boolean
    user: User
    syn: Boolean
  }
  type Query {
    session: Session
  }
  type Mutation {
    newSession(name: String): Session
  }
`;

export const resolvers = {
  Query: {
    session: async (parent: any, args: any, ctx: Context) => {
      const user = (await getUser(ctx.req)).getIdentity();
      return await ctx.db
        .select()
        .from(sessions)
        .where(eq(sessions.userId, user.id))
        .orderBy(desc(sessions.createdAt));
    },
  },
  Mutation: {},
  Session: {},
};
