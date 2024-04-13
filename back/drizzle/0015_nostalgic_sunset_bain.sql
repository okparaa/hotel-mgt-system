ALTER TABLE "page_routes" RENAME TO "routes";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "user_role" TO "user_sxn";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "route_perms" TO "route_sxns";--> statement-breakpoint
ALTER TABLE "routes" RENAME COLUMN "route_role" TO "route_sxn";--> statement-breakpoint
ALTER TABLE "routes" RENAME COLUMN "user_perms" TO "user_sxns";