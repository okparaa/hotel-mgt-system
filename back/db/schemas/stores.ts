import { createId } from "@paralleldrive/cuid2";
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

export const stores = pgTable("stores", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  syn: boolean("syn").default(true),
  itemId: varchar("purchase_id").notNull(),
  qtyReq: numeric("qty").default("0"),
  qty: numeric("qty").default("0"),
  price: decimal("price"),
  routeId: varchar("route_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  userId: varchar("user_id").references(() => users.id),
});

export const storeRelation = relations(stores, ({ one, many }) => ({
  user: one(users, {
    fields: [stores.userId],
    references: [users.id],
  }),
  item: many(items),
}));

export type StoresSelect = InferSelectModel<typeof stores>;
export type StoresInsert = InferInsertModel<typeof stores>;
