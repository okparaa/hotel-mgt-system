import {
  boolean,
  decimal,
  pgTable,
  serial,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { purchases, ordersItems } from ".";
import { createId } from "./create-id";

export const items = pgTable("items", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("items"))
    .primaryKey(),
  name: varchar("name"),
  description: varchar("description"),
  type: varchar("type"),
  sku: serial("sku"),
  price: decimal("price").default("0"),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  qtyBought: decimal("qty_bought").default("0").$type<number>(),
  qtySold: decimal("qty_sold").default("0").$type<number>(),
  deleted: boolean("deleted").default(false),
});

export const itemsRelation = relations(items, ({ one, many }) => ({
  ordersItems: many(ordersItems),
  inventory: one(purchases, {
    fields: [items.id],
    references: [purchases.itemId],
  }),
}));

export type ItemSelect = InferSelectModel<typeof items>;
export type ItemInsert = InferInsertModel<typeof items>;
