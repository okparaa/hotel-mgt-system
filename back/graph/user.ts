import { Context } from "../types/context";
import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();
import { asc, eq } from "drizzle-orm";
import { recoveries, routes, users } from "../db/schemas";
import { registerUser } from "../resolvers/users/new-user";
import { signedUser } from "../resolvers/users/signed";
import { logoutUser } from "../resolvers/users/logout";
import { verifiedUser } from "../resolvers/users/verified";
import { updateRouteSlugs, assignRoute } from "../resolvers/users/edit-user";
import { debitStaff } from "../resolvers/orders/debit-staff";
import { changeDebit } from "../resolvers/orders/change-debit";
import { removeDebit } from "../resolvers/orders/remove-debit";

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
    salary: Float
    username: String
    photoUrl: String
    message: String
    createdAt: String
    updatedAt: String
    route: Route
    routeSlugs: String
    role: String
    syn: Boolean
    recoveries: [Recovery]
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
    rol: String
  }
  type Query {
    users: [User]
    user(id: ID!): User
    currentNumber: Int
    logout(id: ID!): Message
    loggedIn: [String]
    curUser: CurUser
  }
  type Mutation {
    verified(kode: String!): User
    newUser(user: NewUserInput!): User
    signed(user: LoggedUserInput!): Session
    salary(id: ID!, salary: Int): User
    eUserSlugs(user: UserSlugInput): User
    assignRoute(user: UserInput): User
    refreshToken(user: UserTokenInput): User
    debitStaff(debit: XRecoveryInput!): User
    removeRecovery(debitId: ID!): User
    changeRecovery(debit: XRecoveryInput): User
  }

  type Subscription {
    numberIncremented: Int
  }
  input XRecoveryInput {
    orderId: String
    debitId: String
    debitAmt: Float
    staffId: String
    debitAim: String
    debitedAt: String
  }
  type Message {
    message: String
  }
  input UserTokenInput {
    id: ID
    token: String
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
    recoveries: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .select()
        .from(recoveries)
        .where(eq(recoveries.staffId, parent.id));
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
    verified: async (parent: any, args: any, ctx: Context) => {
      return await verifiedUser(parent, args, ctx);
    },
    signed: async (parent: any, args: any, ctx: Context) => {
      return await signedUser(parent, args, ctx);
    },
    newUser: async (parent: any, args: any, ctx: Context) => {
      return await registerUser(parent, args, ctx);
    },
    debitStaff: async (parent: any, args: any, ctx: Context) => {
      return await debitStaff(parent, args, ctx);
    },
    salary: async (parent: any, args: any, ctx: Context) => {
      const [user] = await ctx.db
        .update(users)
        .set({ salary: args.salary })
        .where(eq(users.id, args.id))
        .returning();
      return user;
    },
    assignRoute: async (parent: any, args: any, ctx: Context) => {
      return await assignRoute(parent, args, ctx);
    },
    eUserSlugs: async (parent: any, args: any, ctx: Context) => {
      return await updateRouteSlugs(parent, args, ctx);
    },
    changeRecovery: async (parent: any, args: any, ctx: Context) => {
      return await changeDebit(parent, args, ctx);
    },
    removeRecovery: async (parent: any, args: any, ctx: Context) => {
      return await removeDebit(parent, args, ctx);
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
