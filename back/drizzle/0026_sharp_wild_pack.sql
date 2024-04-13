ALTER TABLE "inventories" RENAME COLUMN "dept_id" TO "route_id";--> statement-breakpoint
ALTER TABLE "inventories" DROP CONSTRAINT "inventories_dept_id_sections_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_dept_id_sections_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventories" ADD CONSTRAINT "inventories_route_id_routes_id_fk" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_dept_id_routes_id_fk" FOREIGN KEY ("dept_id") REFERENCES "routes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
