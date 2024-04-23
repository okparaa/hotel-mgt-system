import { createId } from "@paralleldrive/cuid2";
import {
  boolean,
  decimal,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users, orderStatusEnum, ordersItems, routes } from ".";
import { relations } from "drizzle-orm";

export const orders = pgTable("orders", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  name: varchar("customer_name", { length: 60 }).default("n/a"),
  hash: varchar("hash"),
  customerEmail: varchar("customer_email").default("n/a"),
  customerPhone: varchar("customer_phone").default("n/a"),
  pos: decimal("pos").default("0"),
  cash: decimal("cash").default("0"),
  txfa: decimal("txfa").default("0"),
  status: orderStatusEnum("order_status").default("pending"),
  amountSold: decimal("amount_sold").default("0").$type<number>(),
  userId: varchar("user_id", { length: 128 }).references(() => users.id),
  routeId: varchar("dept_id", { length: 128 }).references(() => routes.id),
});

export const ordersRelation = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  ordersItems: many(ordersItems),
}));
