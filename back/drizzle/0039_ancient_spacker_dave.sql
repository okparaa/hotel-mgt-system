CREATE TABLE IF NOT EXISTS "recovs" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"hash" varchar,
	"pos" numeric DEFAULT '0',
	"cash" numeric DEFAULT '0',
	"txfa" numeric DEFAULT '0',
	"order_id" varchar,
	"amount_recovd" numeric DEFAULT '0',
	"user_id" varchar(128)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recovs" ADD CONSTRAINT "recovs_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recovs" ADD CONSTRAINT "recovs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
