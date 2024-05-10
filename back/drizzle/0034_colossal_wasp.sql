CREATE TABLE IF NOT EXISTS "bookings" (
	"room_id" varchar NOT NULL,
	"book_date" date DEFAULT now(),
	"canceled" boolean DEFAULT false,
	"in_date" date,
	"out_date" date,
	"order_id" varchar NOT NULL,
	"days" numeric DEFAULT '0',
	"amount" numeric DEFAULT '0',
	CONSTRAINT "bookings_room_id_order_id_pk" PRIMARY KEY("room_id","order_id")
);
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
