DO $$ BEGIN
 CREATE TYPE "order_status" AS ENUM('pending', 'canceled', 'completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "pin_status" AS ENUM('valid', 'invalid', 'used');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "roles" AS ENUM('guest', 'cheff', 'waiter', 'barman', 'owner', 'auditor', 'accountant', 'cashier', 'manager', 'owner_rep', 'cleaner', 'security', 'root', 'store_keeper', 'maintenance', 'pool_boy');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "room_status" AS ENUM('booked', 'not_booked', 'out_of_order');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "user_status" AS ENUM('active', 'suspended', 'sacked');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "deductions" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"month" date,
	"deleted" boolean DEFAULT false,
	"amount" numeric DEFAULT '0',
	"reason" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "departments" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inventories" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"price_bought" numeric DEFAULT '0',
	"qty_bought" numeric DEFAULT '0',
	"user_id" varchar(128),
	"item_id" varchar(128),
	"dept_id" varchar(128),
	CONSTRAINT "inventories_created_at_item_id_unique" UNIQUE("created_at","item_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "items" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" varchar,
	"type" varchar,
	"sku" serial NOT NULL,
	"price" numeric DEFAULT '0',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"qty_bought" numeric DEFAULT '0',
	"qty_sold" numeric DEFAULT '0',
	"deleted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"customer_name" varchar(60) DEFAULT 'n/a',
	"hash" varchar,
	"customer_email" varchar DEFAULT 'n/a',
	"customer_phone" varchar DEFAULT 'n/a',
	"order_status" "order_status" DEFAULT 'pending',
	"amount_sold" numeric DEFAULT '0',
	"user_id" varchar(128),
	"dept_id" varchar(128)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders_items" (
	"item_id" varchar NOT NULL,
	"order_id" varchar NOT NULL,
	"qty_sold" numeric DEFAULT '0',
	"price_sold" numeric DEFAULT '0',
	CONSTRAINT "orders_items_item_id_order_id_pk" PRIMARY KEY("item_id","order_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pins" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"pin_status" "pin_status" DEFAULT 'valid',
	"pin" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rooms" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"room_name" varchar,
	"room_desc" varchar,
	"guest_phone" varchar,
	"guest_email" varchar,
	"guest_name" varchar,
	"in_date" timestamp,
	"out_date" timestamp,
	"user_id" varchar,
	"book_date" timestamp,
	"room_status" "room_status" DEFAULT 'not_booked'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"active" boolean DEFAULT true,
	"refresh_token" varchar,
	"access_token" varchar,
	"kode" varchar(12),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"user_id" varchar,
	CONSTRAINT "sessions_refresh_token_unique" UNIQUE("refresh_token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"surname" varchar(60),
	"username" varchar(60),
	"firstname" varchar(60),
	"lastname" varchar(60),
	"phone" varchar(30),
	"photo_url" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"user_status" "user_status" DEFAULT 'active',
	"salary" numeric DEFAULT '0.00',
	"address" varchar(300),
	"password" varchar(60),
	"verified" boolean,
	"roles" "roles" DEFAULT 'guest',
	"dept_id" varchar,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventories" ADD CONSTRAINT "inventories_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventories" ADD CONSTRAINT "inventories_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventories" ADD CONSTRAINT "inventories_dept_id_departments_id_fk" FOREIGN KEY ("dept_id") REFERENCES "departments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_dept_id_departments_id_fk" FOREIGN KEY ("dept_id") REFERENCES "departments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_dept_id_departments_id_fk" FOREIGN KEY ("dept_id") REFERENCES "departments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
