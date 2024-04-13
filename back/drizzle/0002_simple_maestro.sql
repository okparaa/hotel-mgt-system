ALTER TABLE "rooms" ADD COLUMN "price" numeric DEFAULT '0';--> statement-breakpoint
ALTER TABLE "rooms" ADD COLUMN "sku" serial NOT NULL;