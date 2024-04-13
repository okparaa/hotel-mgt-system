import { createId } from "@paralleldrive/cuid2";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { sections } from ".";

export const routes = pgTable("routes", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  name: varchar("name").unique(),
  sectionId: varchar("section_id").references(() => sections.id),
  slug: varchar("slug").default("").notNull(),
  otherSlugs: varchar("other_slugs").default("").notNull(),
  section: varchar("section"),
  isSxn: boolean("section_name").default(true),
  description: varchar("description"),
});
