ALTER TABLE "page_routes" RENAME COLUMN "user_roles" TO "user_perms";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "route_roles" TO "route_perms";