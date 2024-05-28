import {
  boolean,
  decimal,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import {
  InferInsertModel,
  InferSelectModel,
  relations,
  sql,
} from "drizzle-orm";
import { orders, routes } from ".";
import { createId } from "./create-id";

export const users = pgTable("users", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId("users"))
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
  status: boolean("status").default(true),
  salary: decimal("salary").default("0.00"),
  address: varchar("address", { length: 300 }),
  password: varchar("password", { length: 60 }),
  verified: boolean("verified"),
  routeSlugs: varchar("route_slugs").default("").notNull(),
  routeId: varchar("route_id"), //references(()=>routes.id)
});

export const userRelation = relations(users, ({ many, one }) => ({
  session: many(routes),
  route: one(routes, {
    fields: [users.routeId],
    references: [routes.id],
  }),
  order: many(orders),
}));

export type UsersSelect = InferSelectModel<typeof users>;
export type UsersInsert = InferInsertModel<typeof users>;
