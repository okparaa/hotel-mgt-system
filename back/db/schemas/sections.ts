import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { purchases, users } from ".";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { createId } from "./create-id";

export const sections = pgTable("sections", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("sections"))
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  description: varchar("description"),
  deleted: boolean("deleted").default(false),
  name: varchar("name"),
  slug: varchar("slug").unique(),
  isSxn: boolean("is_sxn").default(true),
});

export const sectionsRelation = relations(sections, ({ many }) => ({
  user: many(users),
  purchases: many(purchases),
}));

export type SectionsSelect = InferSelectModel<typeof sections>;
export type SectionsInsert = InferInsertModel<typeof sections>;
