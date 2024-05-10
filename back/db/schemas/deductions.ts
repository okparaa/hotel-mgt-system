import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { boolean, date, decimal, pgTable, varchar } from "drizzle-orm/pg-core";

export const deductions = pgTable("deductions", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id"),
  ddate: date("ddate"),
  deleted: boolean("deleted").default(false),
  amount: decimal("amount").default("0").$type<number>(),
  reason: varchar("reason"),
});

export type DeductionsSelect = InferSelectModel<typeof deductions>;
export type DeductionsInsert = InferInsertModel<typeof deductions>;
