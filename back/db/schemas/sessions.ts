import { createId } from "@paralleldrive/cuid2";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { users, sections } from ".";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";

export const sessions = pgTable("sessions", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
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

export type SessionSelect = InferSelectModel<typeof sessions>;
export type SessionInsert = InferInsertModel<typeof sessions>;
