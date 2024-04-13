import { createId } from "@paralleldrive/cuid2";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  name: varchar("name"),
  description: varchar("description"),
  type: varchar("type"),
});
