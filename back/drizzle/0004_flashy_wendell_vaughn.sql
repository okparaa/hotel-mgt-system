ALTER TYPE "room_status" ADD VALUE 'b';--> statement-breakpoint
ALTER TYPE "room_status" ADD VALUE 'nb';--> statement-breakpoint
ALTER TYPE "room_status" ADD VALUE 'ooo';--> statement-breakpoint
ALTER TABLE "rooms" RENAME COLUMN "room_name" TO "name";--> statement-breakpoint
ALTER TABLE "rooms" RENAME COLUMN "room_desc" TO "description";--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "room_status" DROP DEFAULT;