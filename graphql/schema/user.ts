import { Context } from "@/app/api/v1/route";
import bcrypt from "bcrypt";

export const typeDef = /* GraphQL */ `
  type User @auth(requires: "USER") {
    id: ID!
    surname: String
    firstname: String
    lastname: String
    phone: String
    address: String
    email: String
    active: Boolean
    username: String
    photo_url: String
    hashedPassword: String
    createdAt: String
    updatedAt: String
    dept: Dept
  }
  type Query {
    getUsers: [User]
    getUser(id: ID!): User
    getUserByUsername(username: String!): User
    getUsersLikeSurname(surname: String!): [User]
  }
  type Mutation {
    createUser(user: createUserInput!): User
  }
  input createUserInput {
    surname: String!
    username: String!
    firstname: String!
    lastname: String!
    password: String!
    password_verify: String!
    email: String!
    address: String!
    phone: String!
  }
`;

export const resolvers = {
  Query: {
    getUsers: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.user.findMany();
    },
    getUserByUsername: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.user.findFirst({
        where: {
          username: args.username,
        },
      });
    },
    getUser: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.user.findFirst({
        where: {
          id: args.id,
        },
      });
    },
    getUsersLikeSurname: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.user.findMany({
        where: {
          surname: { contains: args.surname },
        },
      });
    },
  },
  User: {
    dept: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.dept.findFirst({
        where: {
          id: parent.deptId,
        },
      });
    },
  },
  Mutation: {
    createUser: async (parent: any, args: any, ctx: Context) => {
      if (args.user.password !== args.user.password_verify) {
        throw new Error("password missmatch");
      }
      const hashedPassword = await bcrypt.hash(
        args.user.password,
        Number(process.env.BCRYPT_COST) || 5
      );
      delete args.user.password;
      delete args.user.password_verify;
      console.log({ ...args.user, hashedPassword });
      return await ctx.prisma.user.create({
        data: { ...args.user, hashedPassword },
      });
    },
  },
};
