CREATE TABLE IF NOT EXISTS "sections" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"description" varchar,
	"deleted" boolean DEFAULT false,
	"name" varchar,
	"slug" varchar,
	"is_sxn" boolean DEFAULT true,
	CONSTRAINT "sections_slug_unique" UNIQUE("slug")
);
