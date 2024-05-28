import { eq, getTableColumns, sql } from "drizzle-orm";
import { Context } from "../types/context";
import { bookings, orders, recoveries, users } from "../db/schemas";
import { createOrder } from "../resolvers/orders/create-order";
import { recover } from "../resolvers/orders/recover";
import { updateRecov } from "../resolvers/orders/update-recov";
import { removeRecov } from "../resolvers/orders/remove-recov";

export const typeDef = /* GraphQL */ `
  type Order {
    id: ID!
    guestEmail: String
    name: String!
    guestPhone: String
    guestName: String
    user: User
    amount: Float
    deleted: Boolean
    syn: Boolean
    pos: Float
    txfa: Float
    cash: Float
    hash: String
    status: String
    bookings: [Booking]
    recoveries: [Recovery]
    createdAt: String
    updatedAt: String
  }

  type Query {
    order(id: ID!): Order
    orders(date: String): [Order]
    miniSearch: String
  }

  type Mutation {
    createOrder(order: NewOrderInput!): Order
    updateOrder(order: OrderInput!): Order
    removeOrder(id: ID!): Order
    recover(recovery: RecoveryInput!): Order
    updateRecov(recov: RecovInput): Order
    removeRecov(id: ID): Order
  }
  input RecovInput {
    id: ID
    pos: Float
    cash: Float
    txfa: Float
  }

  input RecoveryInput {
    pos: Float
    cash: Float
    txfa: Float
    hash: String
    orderId: String
    userId: String
  }

  input NewOrderInput {
    price: String
    guestEmail: String
    guestPhone: String
    itemId: String
    orderId: String
    qty: String
  }

  input OrderInput {
    price: String
    guestEmail: String
    guestPhone: String
    itemId: String
    orderId: String
    qty: String
  }
`;

export const resolvers = {
  Query: {
    order: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db.select().from(orders).where(eq(orders.id, args.id));
    },
    orders: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .select()
        .from(orders)
        .where(eq(sql`${orders.createdAt}::date`, args.date));
    },
  },
  Mutation: {
    createOrder: async (parent: any, args: any, ctx: Context) => {
      return await createOrder(parent, args, ctx);
    },
    recover: async (parent: any, args: any, ctx: Context) => {
      return await recover(parent, args, ctx);
    },
    updateRecov: async (parent: any, args: any, ctx: Context) => {
      return await updateRecov(parent, args, ctx);
    },
    removeRecov: async (parent: any, args: any, ctx: Context) => {
      return await removeRecov(parent, args, ctx);
    },
  },
  Order: {
    user: async (parent: any, args: any, ctx: Context) => {
      const [user] = await ctx.db
        .select()
        .from(users)
        .where(eq(parent.userId, users.id));
      return user;
    },
    bookings: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .select()
        .from(bookings)
        .where(eq(bookings.orderId, parent.id));
    },
    recoveries: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db
        .select()
        .from(recoveries)
        .where(eq(recoveries.orderId, parent.id));
    },
  },
};
