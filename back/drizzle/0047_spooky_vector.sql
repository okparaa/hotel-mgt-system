ALTER TABLE "recoveries" RENAME COLUMN "updated_at" TO "recovered_for";--> statement-breakpoint
ALTER TABLE "recoveries" RENAME COLUMN "debit" TO "debit_amt";--> statement-breakpoint
ALTER TABLE "recoveries" RENAME COLUMN "debited_at" TO "debited_for";--> statement-breakpoint
ALTER TABLE "recoveries" ALTER COLUMN "staff_id" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "recoveries" ALTER COLUMN "debited_for" SET DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recoveries" ADD CONSTRAINT "recoveries_staff_id_users_id_fk" FOREIGN KEY ("staff_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
