CREATE TABLE IF NOT EXISTS "permissions" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "routes" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"name" varchar,
	"role" "roles" DEFAULT 'guest',
	"perms" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_permissions" (
	"user_id" varchar NOT NULL,
	"permissions_id" varchar NOT NULL,
	CONSTRAINT "users_permissions_user_id_permissions_id_pk" PRIMARY KEY("user_id","permissions_id")
);
--> statement-breakpoint
ALTER TABLE "sections" RENAME COLUMN "is_dept" TO "has_sales";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_permissions" ADD CONSTRAINT "users_permissions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_permissions" ADD CONSTRAINT "users_permissions_permissions_id_permissions_id_fk" FOREIGN KEY ("permissions_id") REFERENCES "permissions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
