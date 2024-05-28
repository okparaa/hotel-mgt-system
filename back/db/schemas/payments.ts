import { InferSelectModel, InferInsertModel, sql } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "./create-id";

export const payments = pgTable("payments", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId(payments))
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  status: boolean("status").default(false),
  reference: varchar("reference"),
  authorizationUrl: varchar("authorization_url"),
  accessCode: varchar("access_code"),
  message: varchar("message"),
  userId: varchar("user_id"),
});

export type PaymentsSelect = InferSelectModel<typeof payments>;
export type PaymentsInsert = InferInsertModel<typeof payments>;
