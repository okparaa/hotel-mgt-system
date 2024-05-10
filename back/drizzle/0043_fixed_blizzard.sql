ALTER TABLE "recovery" RENAME TO "recoveries";--> statement-breakpoint
ALTER TABLE "recoveries" DROP CONSTRAINT "recovery_order_id_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "recoveries" DROP CONSTRAINT "recovery_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recoveries" ADD CONSTRAINT "recoveries_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recoveries" ADD CONSTRAINT "recoveries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
