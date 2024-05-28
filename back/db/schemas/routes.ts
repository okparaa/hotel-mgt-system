import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { createId } from "./create-id";

export const routes = pgTable("routes", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("routes"))
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  name: varchar("name").unique(),
  slug: varchar("slug").default("").notNull(),
  otherSlugs: varchar("other_slugs").default("").notNull(),
  section: varchar("section"),
  isSxn: boolean("section_name").default(true),
  description: varchar("description"),
  routeId: varchar("route_id", { length: 128 }).references(() => routes.id),
});

export type RoutesSelect = InferSelectModel<typeof routes>;
export type RoutesInsert = InferInsertModel<typeof routes>;
