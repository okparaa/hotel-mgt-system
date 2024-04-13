import { eq, sql } from "drizzle-orm";
import { Context } from "../types/context";
import { sections } from "../db/schemas";
import { newSection } from "../resolvers/sections/new-section";
import { updateSection } from "../resolvers/sections/edit-section";

export const typeDef = /* GraphQL */ `
  type Section {
    id: ID!
    name: String!
    createdAt: String
    description: String
    deleted: Boolean
    updatedAt: String
    isSxn: Boolean
    syn: Boolean
    slug: String
  }
  type Query {
    sections: [Section]
    section(id: ID!): Section
  }
  type Mutation {
    newSection(section: NewSectionInput): Section
    eSection(section: SectionInput): Section
    dSection(id: ID!): Section
  }
  input NewSectionInput {
    name: String
    description: String
    isSxn: Boolean
    slug: String
  }
  input SectionInput {
    id: ID!
    name: String
    description: String
    isSxn: Boolean
    slug: String
  }
`;

export const resolvers = {
  Query: {
    sections: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db.query.sections.findMany();
    },
    section: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db.query.sections
        .findFirst({
          where: eq(sections.id, sql.placeholder("id")),
        })
        .prepare("section")
        .execute({ id: args.id });
    },
  },

  Mutation: {
    newSection: async (parent: any, args: any, ctx: Context) => {
      return await newSection(parent, args, ctx);
    },
    eSection: async (parent: any, args: any, ctx: Context) => {
      return await updateSection(parent, args, ctx);
    },
    dSection: async (parent: any, args: any, ctx: Context) => {
      const [data] = await ctx.db
        .update(sections)
        .set({ deleted: true })
        .where(eq(sections.id, args.id))
        .returning();
      return data;
    },
  },
};
