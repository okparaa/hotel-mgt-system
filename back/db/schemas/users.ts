import { createId } from "@paralleldrive/cuid2";
import {
  boolean,
  decimal,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { userStatusEnum } from "./enums";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { deductions, orders, routes, sections, sessions } from ".";

export const users = pgTable("users", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  surname: varchar("surname", { length: 60 }),
  username: varchar("username", { length: 60 }).unique(),
  firstname: varchar("firstname", { length: 60 }),
  lastname: varchar("lastname", { length: 60 }),
  phone: varchar("phone", { length: 30 }).unique(),
  photoUrl: varchar("photo_url"),
  syn: boolean("syn").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  status: userStatusEnum("user_status").default("active"),
  salary: decimal("salary").default("0.00"),
  address: varchar("address", { length: 300 }),
  password: varchar("password", { length: 60 }),
  verified: boolean("verified"),
  routeSlugs: varchar("route_slugs").default("").notNull(),
  routeId: varchar("route_id").references(() => sections.id),
});

export const userRelation = relations(users, ({ many, one }) => ({
  session: many(routes),
  deduction: many(deductions),
  route: one(routes, {
    fields: [users.routeId],
    references: [routes.id],
  }),
  order: many(orders),
}));

export type UserSelect = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;
