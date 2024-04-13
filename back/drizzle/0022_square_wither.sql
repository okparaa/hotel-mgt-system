ALTER TABLE "users" RENAME COLUMN "user_sxn" TO "user_slug";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "route_sxns" TO "route_slugs";--> statement-breakpoint
ALTER TABLE "routes" RENAME COLUMN "route_sxn" TO "route_slug";--> statement-breakpoint
ALTER TABLE "routes" RENAME COLUMN "user_sxns" TO "user_slugs";