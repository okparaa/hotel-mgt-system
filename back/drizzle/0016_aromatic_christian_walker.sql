ALTER TABLE "routes" ALTER COLUMN "route_sxn" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "routes" ALTER COLUMN "route_sxn" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "routes" ALTER COLUMN "user_sxns" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "routes" ALTER COLUMN "user_sxns" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "user_sxn" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "user_sxn" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "route_sxns" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "route_sxns" SET NOT NULL;