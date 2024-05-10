import { createId } from "@paralleldrive/cuid2";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const payments = pgTable("payments", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  status: boolean("status"),
  reference: varchar("reference"),
  authorizationUrl: varchar("authorization_url"),
  accessCode: varchar("access_code"),
  message: varchar("message"),
  userId: varchar("user_id"),
});

export type PaymentsSelect = InferSelectModel<typeof payments>;
export type PaymentsInsert = InferInsertModel<typeof payments>;
