import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean,
  decimal,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createId } from "./create-id";

export const rooms = pgTable("rooms", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("rooms"))
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  name: varchar("name"),
  description: varchar("description"),
  type: varchar("type"),
  status: varchar("status").default("room"),
  reason: text("reason"),
  price: decimal("price").default("0"),
  sku: serial("sku"),
});

export type RoomsSelect = InferSelectModel<typeof rooms>;
export type RoomsInsert = InferInsertModel<typeof rooms>;
