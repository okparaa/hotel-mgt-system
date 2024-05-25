import { desc, eq } from "drizzle-orm";
import { bookings, rooms, users } from "../db/schemas";
import { createRoom } from "../resolvers/rooms/create-room";
import { Context } from "../types/context";
import { updateRoom, roomPrice } from "../resolvers/rooms/update-room";
import { roomColumns, sleep } from "../helpers";
export const typeDef = /* GraphQL */ `
  type Room {
    id: ID!
    name: String!
    description: String
    createdAt: String
    deleted: String
    price: Int
    sku: String
    syn: Boolean
    type: String
    status: String
    booking: Booking
    reason: String
  }

  type Query {
    room(id: ID!): Room
    rooms: [Room]
    roomsChart: [Room]
  }

  type Mutation {
    updateRoom(room: RoomInput): Room
    createRoom(room: NewRoomInput): Room
    removeRoom(id: ID!): Room
    roomPrice(id: ID!, price: Int): Room
  }

  input NewRoomInput {
    name: String
    description: String
    price: Int
    type: String
    status: String
    reason: String
  }

  input RoomInput {
    id: String
    reason: String
    name: String
    price: Int
    description: String
    type: String
    status: String
  }
`;

export const resolvers = {
  Query: {
    rooms: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db.select(roomColumns).from(rooms);
    },
    room: async (parent: any, args: any, ctx: Context) => {
      const [room] = await ctx.db
        .select()
        .from(rooms)
        .where(eq(rooms.id, args.id));
      return room;
    },
  },

  Mutation: {
    createRoom: async (parent: any, args: any, ctx: Context) => {
      return await createRoom(parent, args, ctx);
    },
    updateRoom: async (parent: any, args: any, ctx: Context) => {
      return await updateRoom(parent, args, ctx);
    },
    roomPrice: async (parent: any, args: any, ctx: Context) => {
      return await roomPrice(parent, args, ctx);
    },
  },

  Room: {
    booking: async (parent: any, args: any, ctx: Context) => {
      console.log(parent, args);
      const [book] = await ctx.db
        .select()
        .from(bookings)
        .where(eq(bookings.roomId, parent.id))
        .orderBy(desc(bookings.bookDate))
        .limit(1);
      return book;
    },
  },
};
