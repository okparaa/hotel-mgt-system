import { eq } from "drizzle-orm";
import { roles } from "../db/schemas";
import { Context } from "../types/context";
import { createRole } from "../resolvers/roles/new-role";
import { updateRole } from "../resolvers/roles/edit-role";

export const typeDef = /* GraphQL */ `
  type Role {
    id: ID!
    deleted: String
    syn: Boolean
    type: String
    name: String
    createdAt: String
    updatedAt: String
    description: String
  }
  type Query {
    role(id: ID!): Role
    roles: [Role]
  }
  type Mutation {
    newRole(role: NewRoleInput): Role
    eRole(role: RoleInput): Role
    dRole(id: ID!): Role
  }

  input NewRoleInput {
    name: String
    type: String
    description: String
  }
  input RoleInput {
    id: ID
    name: String
    type: String
    description: String
  }
`;
export const resolvers = {
  Query: {
    roles: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db.select().from(roles);
    },
    role: async (parent: any, args: any, ctx: Context) => {
      const [role] = await ctx.db
        .select()
        .from(roles)
        .where(eq(roles.id, args.id));
      return role;
    },
  },
  Mutation: {
    newRole: async (parent: any, args: any, ctx: Context) => {
      return await createRole(parent, args, ctx);
    },
    eRole: async (parent: any, args: any, ctx: Context) => {
      return await updateRole(parent, args, ctx);
    },
  },
};
