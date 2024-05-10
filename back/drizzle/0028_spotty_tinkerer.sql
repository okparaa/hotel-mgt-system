CREATE TABLE IF NOT EXISTS "orders_bookings" (
	"room_id" varchar NOT NULL,
	"order_id" varchar NOT NULL,
	"qty_sold" numeric DEFAULT '0',
	"price_sold" numeric DEFAULT '0',
	CONSTRAINT "orders_bookings_room_id_order_id_pk" PRIMARY KEY("room_id","order_id")
);
--> statement-breakpoint
ALTER TABLE "inventories" DROP CONSTRAINT "inventories_route_id_routes_id_fk";
--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "in_date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "in_date" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "out_date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "out_date" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "inventories" DROP COLUMN IF EXISTS "route_id";--> statement-breakpoint
ALTER TABLE "rooms" DROP COLUMN IF EXISTS "status";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders_bookings" ADD CONSTRAINT "orders_bookings_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders_bookings" ADD CONSTRAINT "orders_bookings_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
