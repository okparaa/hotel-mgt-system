import { pgEnum } from "drizzle-orm/pg-core";

export const userStatusEnum = pgEnum("user_status", [
  "active",
  "suspended",
  "sacked",
]);

export const rolesEnum = pgEnum("roles_enum", [
  "guest",
  "cheff",
  "waiter",
  "barman",
  "owner",
  "auditor",
  "accountant",
  "cashier",
  "manager",
  "owner_rep",
  "cleaner",
  "security",
  "root",
  "store_keeper",
  "maintenance",
  "pool_boy",
]);

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "canceled",
  "completed",
]);

export const pinStatusEnum = pgEnum("pin_status", ["valid", "invalid", "used"]);

export const roomStatusEnum = pgEnum("room_status", ["b", "nb", "ooo"]);
