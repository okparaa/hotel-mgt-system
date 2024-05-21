import { desc, eq } from "drizzle-orm";
import { bookings, rooms, users } from "../db/schemas";
import { createNewRoom } from "../resolvers/rooms/new-room";
import { Context } from "../types/context";
import { updateRoom, roomPrice } from "../resolvers/rooms/edit-room";
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
  }

  type Query {
    room(id: ID!): Room
    rooms: [Room]
    roomsChart: [Room]
  }

  type Mutation {
    eRoom(room: RoomInput): Room
    newRoom(room: NewRoomInput): Room
    dRoom(id: ID!): Room
    roomPrice(id: ID!, price: Int): Room
  }

  input NewRoomInput {
    name: String
    description: String
    price: Int
    type: String
  }

  input RoomInput {
    id: String
    name: String
    price: Int
    description: String
    type: String
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
    newRoom: async (parent: any, args: any, ctx: Context) => {
      return await createNewRoom(parent, args, ctx);
    },
    eRoom: async (parent: any, args: any, ctx: Context) => {
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
