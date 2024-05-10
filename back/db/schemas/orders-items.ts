import { decimal, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { items, orders, rooms } from ".";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const ordersItems = pgTable(
  "orders_items",
  {
    itemId: varchar("item_id")
      .notNull()
      .references(() => items.id),
    orderId: varchar("order_id")
      .notNull()
      .references(() => orders.id),
    qtySold: decimal("qty_sold").default("0").$type<number>(),
    priceSold: decimal("price_sold").default("0").$type<number>(),
  },
  (tbl) => ({
    pk: primaryKey({ columns: [tbl.itemId, tbl.orderId] }),
  })
);

export type OrdersItemsSelect = InferSelectModel<typeof ordersItems>;
export type OrdersItemsInsert = InferInsertModel<typeof ordersItems>;
