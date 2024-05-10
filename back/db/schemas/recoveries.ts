import { createId } from "@paralleldrive/cuid2";
import {
  boolean,
  decimal,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users, orders } from ".";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";

export const recoveries = pgTable("recoveries", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  pos: decimal("pos").default("0"),
  cash: decimal("cash").default("0"),
  txfa: decimal("txfa").default("0"),
  orderId: varchar("order_id").references(() => orders.id),
  userId: varchar("user_id", { length: 128 }).references(() => users.id),
});

export const recoveriesRelation = relations(recoveries, ({ one }) => ({
  user: one(users, {
    fields: [recoveries.userId],
    references: [users.id],
  }),
  order: one(orders, {
    fields: [recoveries.orderId],
    references: [orders.id],
  }),
}));

export type RecoveriesSelect = InferSelectModel<typeof recoveries>;
export type RecoveriesInsert = InferInsertModel<typeof recoveries>;
