ALTER TABLE "recoveries" RENAME COLUMN "debited_for" TO "debited_at";--> statement-breakpoint
ALTER TABLE "recoveries" ADD COLUMN "debit_aim" varchar;