import { eq, getTableColumns, sql } from "drizzle-orm";
import { Context } from "../types/context";
import { bookings, orders, recoveries, users } from "../db/schemas";
import { createNewOrder } from "../resolvers/orders/new-order";
import { recover } from "../resolvers/orders/recover";
import { changeOrderRecov } from "../resolvers/orders/change-recov";
import { removeOrderRecov } from "../resolvers/orders/remove-recov";

export const typeDef = /* GraphQL */ `
  type Order {
    id: ID!
    price: Float
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
    newOrder(order: NewOrderInput!): Order
    eOrder(order: OrderInput!): Order
    dOrder(id: ID!): Order
    recover(recovery: RecoveryInput!): Order
    changeOrderRecov(recov: RecovInput): Order
    removeOrderRecov(id: ID): Order
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
    newOrder: async (parent: any, args: any, ctx: Context) => {
      console.log(args);
      return await createNewOrder(parent, args, ctx);
    },
    recover: async (parent: any, args: any, ctx: Context) => {
      return await recover(parent, args, ctx);
    },
    changeOrderRecov: async (parent: any, args: any, ctx: Context) => {
      return await changeOrderRecov(parent, args, ctx);
    },
    removeOrderRecov: async (parent: any, args: any, ctx: Context) => {
      return await removeOrderRecov(parent, args, ctx);
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
