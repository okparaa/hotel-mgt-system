ALTER TABLE "users" RENAME COLUMN "section_id" TO "route_id";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_section_id_sections_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_route_id_sections_id_fk" FOREIGN KEY ("route_id") REFERENCES "sections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
