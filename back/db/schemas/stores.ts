import {
  boolean,
  decimal,
  numeric,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { items } from "./items";
import { routes } from "./routes";
import { createId } from "./create-id";

export const stores = pgTable("stores", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("stores"))
    .primaryKey(),
  syn: boolean("syn").default(true),
  itemId: varchar("item_id").references(() => items.id),
  qty: numeric("qty").default("0"),
  routeId: varchar("route_id").references(() => routes.id),
  deleted: boolean("deleted").default(false),
});

export const storeRelation = relations(stores, ({ one }) => ({
  item: one(items, {
    fields: [stores.itemId],
    references: [items.id],
  }),
}));

export type StoresSelect = InferSelectModel<typeof stores>;
export type StoresInsert = InferInsertModel<typeof stores>;
