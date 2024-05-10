import { createId } from "@paralleldrive/cuid2";
import {
  boolean,
  decimal,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users, orderStatusEnum, ordersItems, routes } from ".";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { recoveries } from "./recoveries";

export const orders = pgTable("orders", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  guestName: varchar("guest_name", { length: 60 }).default("n/a"),
  hash: varchar("hash"),
  guestEmail: varchar("guest_email").default("n/a"),
  guestPhone: varchar("guest_phone").default("n/a"),
  pos: decimal("pos").default("0"),
  cash: decimal("cash").default("0"),
  txfa: decimal("txfa").default("0"),
  status: orderStatusEnum("order_status").default("pending"),
  amount: decimal("amount").default("0").$type<number>(),
  userId: varchar("user_id", { length: 128 }).references(() => users.id),
  routeId: varchar("dept_id", { length: 128 }).references(() => routes.id),
});

export const ordersRelation = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  ordersItems: many(ordersItems),
  recov: many(recoveries),
}));

export type OrdersSelect = InferSelectModel<typeof orders>;
export type OrdersInsert = InferInsertModel<typeof orders>;
