DO $$ BEGIN
 CREATE TYPE "roles_enum" AS ENUM('guest', 'cheff', 'waiter', 'barman', 'owner', 'auditor', 'accountant', 'cashier', 'manager', 'owner_rep', 'cleaner', 'security', 'root', 'store_keeper', 'maintenance', 'pool_boy');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"status" boolean,
	"reference" varchar,
	"authorization_url" varchar,
	"access_code" varchar,
	"message" varchar,
	"user_id" varchar
);
--> statement-breakpoint
DROP TABLE "permissions";--> statement-breakpoint
DROP TABLE "users_permissions";--> statement-breakpoint
ALTER TABLE "routes" RENAME TO "page_routes";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "role" TO "user_role";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "perms" TO "route_roles";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "dept_id" TO "section_id";--> statement-breakpoint
ALTER TABLE "page_routes" RENAME COLUMN "role" TO "route_role";--> statement-breakpoint
ALTER TABLE "page_routes" RENAME COLUMN "perms" TO "user_roles";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_dept_id_sections_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "user_role" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "user_role" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "page_routes" ALTER COLUMN "route_role" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "page_routes" ALTER COLUMN "route_role" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "inventories" ADD COLUMN "syn" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "syn" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "syn" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "pins" ADD COLUMN "syn" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "rooms" ADD COLUMN "syn" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "sections" ADD COLUMN "syn" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "syn" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "syn" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "page_routes" ADD COLUMN "syn" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "page_routes" ADD COLUMN "description" varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
