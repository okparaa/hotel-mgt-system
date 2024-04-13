import { Context } from "../types/context";
import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();
import { asc, eq } from "drizzle-orm";
import { deductions, routes, sections, users } from "../db/schemas";
import { registerUser } from "../resolvers/users/new-user";
import { signedUser } from "../resolvers/users/signed";
import { logoutUser } from "../resolvers/users/logout";
import { verifiedUser } from "../resolvers/users/verified";
import {
  updateRouteSlugs,
  updateUserRoute,
} from "../resolvers/users/edit-user";

let currentNumber = 0;

export const typeDef = /* GraphQL */ `
  type User {
    id: ID!
    surname: String
    firstname: String
    lastname: String
    phone: String
    token: String
    address: String
    active: Boolean
    salary: String
    username: String
    photoUrl: String
    message: String
    createdAt: String
    updatedAt: String
    route: Route
    routeSlugs: String
    syn: Boolean
    deductions: [Deduction]
  }
  type CurUser {
    id: ID
    sur: String
    fir: String
    las: String
    pic: String
    usr: String
    slg: String
    rut: String
  }
  type Query {
    users: [User]
    user(id: ID!): User
    currentNumber: Int
    logout(id: ID!): Message
    verified(kode: String!): User
    loggedIn: [String]
    cur_user: CurUser
  }
  type Mutation {
    newUser(user: NewUserInput!): User
    signed(user: LoggedUserInput!): Session
    salary(id: ID!, salary: String): User
    eUserSlugs(user: UserSlugInput): User
    assignRoute(user: UserInput): User
  }
  type Subscription {
    numberIncremented: Int
  }
  type Message {
    message: String
  }
  input NewUserInput {
    surname: String!
    username: String!
    firstname: String!
    lastname: String!
    password: String!
    password2: String!
    address: String!
    phone: String!
  }
  input LoggedUserInput {
    username: String!
    password: String!
  }
  input UserInput {
    id: String!
    routeId: String
  }
  input UserSlugInput {
    id: String!
    routeSlugs: String
  }
`;

export const resolvers = {
  Query: {
    currentNumber() {
      return currentNumber;
    },
    verified: async (parent: any, args: any, ctx: Context) => {
      return await verifiedUser(parent, args, ctx);
    },
    users: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db.select().from(users).orderBy(asc(users.surname));
    },
    logout: async (parent: any, args: any, ctx: Context) => {
      return await logoutUser(parent, args, ctx);
    },
    user: async (parent: any, args: any, ctx: Context) => {
      const [user] = await ctx.db
        .select()
        .from(users)
        .where(eq(users.id, args.id));
      return user;
    },
  },
  User: {
    route: async (parent: any, args: any, ctx: Context) => {
      const [route] = await ctx.db
        .select()
        .from(routes)
        .where(eq(routes.id, parent.routeId));
      return route;
    },
    deductions: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .select()
        .from(deductions)
        .where(eq(deductions.userId, parent.id));
    },
  },
  Subscription: {
    numberIncremented: {
      subscribe: () => {
        return pubsub.asyncIterator(["NUMBER_INCREMENTED"]);
      },
    },
  },
  Mutation: {
    signed: async (parent: any, args: any, ctx: Context) => {
      return await signedUser(parent, args, ctx);
    },
    newUser: async (parent: any, args: any, ctx: Context) => {
      return await registerUser(parent, args, ctx);
    },
    salary: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .update(users)
        .set({ salary: args.salary })
        .where(eq(users.id, args.id))
        .returning();
    },
    assignRoute: async (parent: any, args: any, ctx: Context) => {
      return await updateUserRoute(parent, args, ctx);
    },
    eUserSlugs: async (parent: any, args: any, ctx: Context) => {
      return await updateRouteSlugs(parent, args, ctx);
    },
  },
};

function incrementNumber() {
  currentNumber++;
  pubsub.publish("NUMBER_INCREMENTED", { numberIncremented: currentNumber });
  setTimeout(incrementNumber, 1000);
}

// Start incrementing
incrementNumber();
