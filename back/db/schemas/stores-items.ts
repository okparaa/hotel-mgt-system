import {
  boolean,
  decimal,
  numeric,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { items } from "./items";
import { routes } from "./routes";
import { stores } from "./stores";
import { createId } from "./create-id";

export const storesItems = pgTable("stores_items", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("stores-items"))
    .primaryKey(),
  syn: boolean("syn").default(true),
  itemId: varchar("item_id").references(() => items.id),
  storeId: varchar("store_id").references(() => stores.id),
  qtyReq: numeric("qty_req").default("0"),
  qty: numeric("qty").default("0"),
  curPrice: decimal("cur_price"),
  routeId: varchar("route_id").references(() => routes.id),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
  deleted: boolean("deleted").default(false),
  userId: varchar("user_id").references(() => users.id),
});

export const storesItemsRelation = relations(storesItems, ({ one, many }) => ({
  user: one(users, {
    fields: [storesItems.userId],
    references: [users.id],
  }),
  item: many(items),
}));

export type StoresItemsSelect = InferSelectModel<typeof storesItems>;
export type StoresItemsInsert = InferInsertModel<typeof storesItems>;
