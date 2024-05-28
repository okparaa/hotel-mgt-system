import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "./create-id";

export const roles = pgTable("roles", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("roles"))
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  name: varchar("name"),
  description: varchar("description"),
  type: varchar("type"),
});

export type RolesSelect = InferSelectModel<typeof roles>;
export type RolesInsert = InferInsertModel<typeof roles>;
