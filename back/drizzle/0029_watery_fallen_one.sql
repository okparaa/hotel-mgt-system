ALTER TABLE "orders_bookings" ADD COLUMN "book_date" date DEFAULT now();--> statement-breakpoint
ALTER TABLE "orders_bookings" ADD COLUMN "canceled" boolean DEFAULT false;