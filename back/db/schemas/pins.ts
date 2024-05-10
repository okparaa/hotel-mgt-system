import { createId } from "@paralleldrive/cuid2";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { pinStatusEnum } from ".";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const pins = pgTable("pins", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  status: pinStatusEnum("pin_status").default("valid"),
  pin: varchar("pin"),
});

export type PinsSelect = InferSelectModel<typeof pins>;
export type PinsInsert = InferInsertModel<typeof pins>;
