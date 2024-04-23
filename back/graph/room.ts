import { eq } from "drizzle-orm";
import { rooms, users } from "../db/schemas";
import { createNewRoom } from "../resolvers/rooms/new-room";
import { Context } from "../types/context";
import { updateRoom, updateRoomPrice } from "../resolvers/rooms/edit-room";
import { roomColumns, sleep } from "../helpers";
import { bookings } from "../resolvers/rooms/bookings";
export const typeDef = /* GraphQL */ `
  type Room {
    id: ID!
    name: String!
    description: String
    createdAt: String
    deleted: String
    price: Int
    sku: String
    guestName: String
    guestEmail: String
    guestPhone: String
    syn: Boolean
    type: String
    inDate: String
    outDate: String
    bookDate: String
    status: String
    user: User
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
    booker(book: RoomBookInput): [Room]
  }
  input NewRoomInput {
    name: String
    description: String
    price: Int
    type: String
  }
  input RoomBookInput {
    id: String!
    txfa: Int
    total: Int
    pos: Int
    cash: Int
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
      return await updateRoomPrice(parent, args, ctx);
    },
    booker: async (parent: any, args: any, ctx: Context) => {
      return await bookings(parent, args, ctx);
    },
  },

  Room: {
    user: async (parent: any, args: any, ctx: Context) => {
      const [user] = await ctx.db
        .select()
        .from(users)
        .where(eq(users.id, parent.userId));
      return user;
    },
  },
};
