ALTER TABLE "users" RENAME COLUMN "roles" TO "role";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "perms" varchar;