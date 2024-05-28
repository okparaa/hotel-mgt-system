import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from ".";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { createId } from "./create-id";

export const sessions = pgTable("sessions", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("sessions"))
    .primaryKey(),
  active: boolean("active").default(true),
  refreshToken: varchar("refresh_token"),
  accessToken: varchar("access_token"),
  kode: varchar("kode", { length: 12 }),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  userId: varchar("user_id").references(() => users.id),
});

export const sessionRelation = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export type SessionsSelect = InferSelectModel<typeof sessions>;
export type SessionsInsert = InferInsertModel<typeof sessions>;
