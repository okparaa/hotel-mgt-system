CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"surname" varchar(60),
	"username" varchar(60),
	"firstname" varchar(60),
	"lastname" varchar(60),
	"phone" varchar(30),
	"photo_url" varchar,
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"status" boolean DEFAULT true,
	"salary" numeric DEFAULT '0.00',
	"address" varchar(300),
	"password" varchar(60),
	"verified" boolean,
	"route_slugs" varchar DEFAULT '' NOT NULL,
	"route_id" varchar,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "purchases" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"created_at" date DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"price_bought" numeric DEFAULT '0',
	"qty_bought" numeric DEFAULT '0',
	"user_id" varchar(128),
	"item_id" varchar(128),
	CONSTRAINT "purchases_created_at_item_id_unique" UNIQUE("created_at","item_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"guest_name" varchar(60) DEFAULT 'n/a',
	"hash" varchar,
	"guest_email" varchar DEFAULT 'n/a',
	"guest_phone" varchar DEFAULT 'n/a',
	"pos" numeric DEFAULT '0',
	"cash" numeric DEFAULT '0',
	"txfa" numeric DEFAULT '0',
	"status" boolean,
	"amount" numeric DEFAULT '0',
	"user_id" varchar(128),
	"dept_id" varchar(128)
);
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
CREATE TABLE IF NOT EXISTS "pins" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"status" boolean,
	"pin" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"name" varchar,
	"description" varchar,
	"type" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rooms" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"name" varchar,
	"description" varchar,
	"type" integer,
	"status" varchar,
	"reason" text,
	"price" numeric DEFAULT '0',
	"sku" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "routes" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"name" varchar,
	"slug" varchar DEFAULT '' NOT NULL,
	"other_slugs" varchar DEFAULT '' NOT NULL,
	"section" varchar,
	"section_name" boolean DEFAULT true,
	"description" varchar,
	"route_id" varchar(128),
	CONSTRAINT "routes_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders_items" (
	"item_id" varchar NOT NULL,
	"order_id" varchar NOT NULL,
	"cur_price" numeric,
	"qty_sold" numeric DEFAULT '0',
	"price_sold" numeric DEFAULT '0',
	CONSTRAINT "orders_items_item_id_order_id_pk" PRIMARY KEY("item_id","order_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stores_items" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"item_id" varchar,
	"store_id" varchar,
	"qty_req" numeric DEFAULT '0',
	"qty" numeric DEFAULT '0',
	"cur_price" numeric,
	"route_id" varchar,
	"created_at" timestamp,
	"updated_at" timestamp,
	"deleted" boolean DEFAULT false,
	"user_id" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"active" boolean DEFAULT true,
	"refresh_token" varchar,
	"access_token" varchar,
	"kode" varchar(12),
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"user_id" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "items" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" varchar,
	"type" varchar,
	"sku" serial NOT NULL,
	"price" numeric DEFAULT '0',
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"qty_bought" numeric DEFAULT '0',
	"qty_sold" numeric DEFAULT '0',
	"deleted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"room_id" varchar NOT NULL,
	"book_date" date DEFAULT now(),
	"canceled" boolean DEFAULT false,
	"in_date" date,
	"out_date" date,
	"order_id" varchar NOT NULL,
	"days" numeric DEFAULT '0',
	"cur_price" numeric,
	"amount" numeric DEFAULT '0',
	CONSTRAINT "bookings_in_date_room_id_unique" UNIQUE("in_date","room_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stores" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"item_id" varchar,
	"qty" numeric DEFAULT '0',
	"route_id" varchar,
	"deleted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recoveries" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"recovered_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"pos" numeric DEFAULT '0',
	"cash" numeric DEFAULT '0',
	"hash" varchar,
	"staff_id" varchar(128),
	"debit_amt" numeric,
	"debited_at" date DEFAULT now(),
	"debit_aim" varchar,
	"txfa" numeric DEFAULT '0',
	"order_id" varchar,
	"user_id" varchar(128)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purchases" ADD CONSTRAINT "purchases_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purchases" ADD CONSTRAINT "purchases_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "orders" ADD CONSTRAINT "orders_dept_id_routes_id_fk" FOREIGN KEY ("dept_id") REFERENCES "routes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "routes" ADD CONSTRAINT "routes_route_id_routes_id_fk" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "stores_items" ADD CONSTRAINT "stores_items_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stores_items" ADD CONSTRAINT "stores_items_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stores_items" ADD CONSTRAINT "stores_items_route_id_routes_id_fk" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stores_items" ADD CONSTRAINT "stores_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stores" ADD CONSTRAINT "stores_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stores" ADD CONSTRAINT "stores_route_id_routes_id_fk" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recoveries" ADD CONSTRAINT "recoveries_staff_id_users_id_fk" FOREIGN KEY ("staff_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recoveries" ADD CONSTRAINT "recoveries_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recoveries" ADD CONSTRAINT "recoveries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
