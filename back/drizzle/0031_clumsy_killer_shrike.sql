ALTER TABLE "orders" RENAME COLUMN "customer_name" TO "guest_name";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "customer_email" TO "guest_email";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "customer_phone" TO "guest_phone";--> statement-breakpoint
ALTER TABLE "orders_bookings" RENAME COLUMN "qty_sold" TO "days";--> statement-breakpoint
ALTER TABLE "orders_bookings" RENAME COLUMN "price_sold" TO "amount";--> statement-breakpoint
ALTER TABLE "orders_bookings" ADD COLUMN "in_date" date;--> statement-breakpoint
ALTER TABLE "orders_bookings" ADD COLUMN "out_date" date;--> statement-breakpoint
ALTER TABLE "rooms" DROP COLUMN IF EXISTS "guest_phone";--> statement-breakpoint
ALTER TABLE "rooms" DROP COLUMN IF EXISTS "guest_email";--> statement-breakpoint
ALTER TABLE "rooms" DROP COLUMN IF EXISTS "guest_name";--> statement-breakpoint
ALTER TABLE "rooms" DROP COLUMN IF EXISTS "in_date";--> statement-breakpoint
ALTER TABLE "rooms" DROP COLUMN IF EXISTS "out_date";--> statement-breakpoint
ALTER TABLE "rooms" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "orders_bookings" DROP COLUMN IF EXISTS "user_id";