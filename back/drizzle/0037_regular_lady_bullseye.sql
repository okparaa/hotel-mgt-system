ALTER TABLE "bookings" DROP CONSTRAINT "bookings_in_date_room_id_unique";--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_out_date_room_id_unique" UNIQUE("out_date","room_id");