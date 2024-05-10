import { createId } from "@paralleldrive/cuid2";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { sections } from ".";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

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
  routeId: varchar("route_id", { length: 128 }).references(() => routes.id),
});

export type RoutesSelect = InferSelectModel<typeof routes>;
export type RoutesInsert = InferInsertModel<typeof routes>;
