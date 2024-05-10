import { createId } from "@paralleldrive/cuid2";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean,
  date,
  decimal,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

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
  type: integer("type"),
  price: decimal("price").default("0"),
  sku: serial("sku"),
});

export type RoomsSelect = InferSelectModel<typeof rooms>;
export type RoomsInsert = InferInsertModel<typeof rooms>;
