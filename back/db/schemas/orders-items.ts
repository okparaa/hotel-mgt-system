import { decimal, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { items, orders } from ".";

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
