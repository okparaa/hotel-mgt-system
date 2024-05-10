ALTER TABLE "bookings" DROP CONSTRAINT "bookings_room_id_order_id_pk";--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "id" varchar(128) NOT NULL;