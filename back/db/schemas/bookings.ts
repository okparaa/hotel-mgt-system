import {
  boolean,
  date,
  decimal,
  pgTable,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { rooms } from "./rooms";
import { orders } from "./orders";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { createId } from "./create-id";

export const bookings = pgTable(
  "bookings",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => createId("bookings"))
      .primaryKey(),
    roomId: varchar("room_id")
      .notNull()
      .references(() => rooms.id),
    bookDate: date("book_date").defaultNow(),
    canceled: boolean("canceled").default(false),
    inDate: date("in_date"),
    outDate: date("out_date"),
    orderId: varchar("order_id")
      .notNull()
      .references(() => orders.id),
    days: decimal("days").default("0").$type<number>(),
    curPrice: decimal("cur_price"),
    amount: decimal("amount").default("0").$type<number>(),
  },
  (tbl) => ({
    unq: unique().on(tbl.inDate, tbl.roomId),
  })
);

export type BookingSelect = InferSelectModel<typeof bookings>;
export type BookingInsert = InferInsertModel<typeof bookings>;
