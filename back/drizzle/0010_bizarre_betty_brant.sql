ALTER TABLE "departments" RENAME TO "sections";--> statement-breakpoint
ALTER TABLE "inventories" DROP CONSTRAINT "inventories_dept_id_departments_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_dept_id_departments_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_dept_id_departments_id_fk";
--> statement-breakpoint
ALTER TABLE "sections" ADD COLUMN "description" varchar;--> statement-breakpoint
ALTER TABLE "sections" ADD COLUMN "is_dept" boolean DEFAULT true;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventories" ADD CONSTRAINT "inventories_dept_id_sections_id_fk" FOREIGN KEY ("dept_id") REFERENCES "sections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_dept_id_sections_id_fk" FOREIGN KEY ("dept_id") REFERENCES "sections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_dept_id_sections_id_fk" FOREIGN KEY ("dept_id") REFERENCES "sections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
