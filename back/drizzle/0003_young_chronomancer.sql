ALTER TABLE "rooms" ALTER COLUMN "in_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "out_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "book_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "rooms" ADD COLUMN "type" integer;