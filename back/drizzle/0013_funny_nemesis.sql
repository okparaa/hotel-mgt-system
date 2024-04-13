CREATE TABLE IF NOT EXISTS "roles" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"name" varchar,
	"description" varchar,
	"type" varchar
);
