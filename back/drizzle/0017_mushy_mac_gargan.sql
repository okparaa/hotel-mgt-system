ALTER TABLE "sections" ADD COLUMN "slug" varchar;--> statement-breakpoint
ALTER TABLE "sections" ADD CONSTRAINT "sections_slug_unique" UNIQUE("slug");