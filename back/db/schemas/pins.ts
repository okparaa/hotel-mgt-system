import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel, sql } from "drizzle-orm";
import { createId } from "./create-id";

export const pins = pgTable("pins", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("pins"))
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  status: boolean("status"),
  pin: varchar("pin"),
});

export type PinsSelect = InferSelectModel<typeof pins>;
export type PinsInsert = InferInsertModel<typeof pins>;
