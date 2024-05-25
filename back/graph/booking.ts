import { eq } from "drizzle-orm";
import { Context } from "../types/context";
import { rooms } from "../db/schemas";
import { createBooking } from "../resolvers/booking/create-booking";
import { cancelBooking } from "../resolvers/booking/cancel-booking";
import { sleep } from "../helpers";

export const typeDef = /* GraphQL */ `
  type Booking {
    id: ID!
    amount: Float
    days: Int
    room: Room
    inDate: String
    outDate: String
    bookDate: String
    canceled: Boolean
    syn: Boolean
    price: Float
  }
  type Query {
    order_books: [String]
  }
  type Mutation {
    updateOrderBook(id: ID!): Booking
    booker(books: [BookingInput!], detail: DetailInput): [Room]
    cancelBooking(id: ID!): Booking
  }
  input BookingInput {
    roomId: String
    price: Float
    inDate: String
    outDate: String
    days: Int
    guestName: String
    guestEmail: String
    guestPhone: String
  }
  input DetailInput {
    pos: Float
    txfa: Float
    cash: Float
    userId: String
    total: Float
    hash: String
    guestEmail: String
    guestPhone: String
    guestName: String
  }
`;

export const resolvers = {
  Query: {},
  Mutation: {
    booker: async (parent: any, args: any, ctx: Context) => {
      return await createBooking(parent, args, ctx);
    },
    cancelBooking: async (parent: any, args: any, ctx: Context) => {
      const room = await cancelBooking(parent, args, ctx);
      return room;
    },
  },
  Booking: {
    room: async (parent: any, args: any, ctx: Context) => {
      const [room] = await ctx.db
        .select()
        .from(rooms)
        .where(eq(parent.roomId, rooms.id));
      return room;
    },
  },
};
