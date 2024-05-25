import { createId } from "@paralleldrive/cuid2";
import {
  boolean,
  date,
  decimal,
  pgTable,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { users, sections, items, routes } from ".";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";

export const purchases = pgTable(
  "inventories",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    syn: boolean("syn").default(true),
    createdAt: date("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    deleted: boolean("deleted").default(false),
    priceBought: decimal("price_bought").default("0").$type<number>(),
    qtyBought: decimal("qty_bought").default("0").$type<number>(),
    userId: varchar("user_id", { length: 128 }).references(() => users.id),
    itemId: varchar("item_id", { length: 128 }).references(() => items.id),
  },
  (tbl) => ({
    syn: boolean("syn").default(true),
    item_date: unique().on(tbl.createdAt, tbl.itemId),
  })
);

export const inventoryRelation = relations(purchases, ({ one, many }) => ({
  user: one(users, {
    fields: [purchases.userId],
    references: [users.id],
  }),
  item: one(items, {
    fields: [purchases.itemId],
    references: [items.id],
  }),
}));

export type PurchasesSelect = InferSelectModel<typeof purchases>;
export type PurchasesInsert = InferInsertModel<typeof purchases>;
