import { createId } from "@paralleldrive/cuid2";
import {
  boolean,
  decimal,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { roomStatusEnum } from ".";

export const rooms = pgTable("rooms", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  name: varchar("name"),
  description: varchar("description"),
  guestPhone: varchar("guest_phone"),
  guestEmail: varchar("guest_email"),
  guestName: varchar("guest_name"),
  inDate: timestamp("in_date").defaultNow(),
  outDate: timestamp("out_date").defaultNow(),
  userId: varchar("user_id"),
  type: integer("type"),
  price: decimal("price").default("0"),
  sku: serial("sku"),
  bookDate: timestamp("book_date").defaultNow(),
  status: roomStatusEnum("status").default("nb"),
});
