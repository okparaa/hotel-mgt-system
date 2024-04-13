ALTER TABLE "routes" RENAME COLUMN "user_slugs" TO "other_slugs";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "user_slug";