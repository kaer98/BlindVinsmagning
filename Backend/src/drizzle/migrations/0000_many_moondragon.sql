-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "GenderEnum" AS ENUM('FEMALE', 'MALE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"birthday" timestamp(3) NOT NULL,
	"fullName" text NOT NULL,
	"gender" "GenderEnum" NOT NULL,
	"password" text NOT NULL,
	"username" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Wine" (
	"id" serial PRIMARY KEY NOT NULL,
	"country" text NOT NULL,
	"region" text NOT NULL,
	"prodYear" date NOT NULL,
	"producer" text NOT NULL,
	"alcohol" numeric(65, 30) NOT NULL,
	"type" text NOT NULL,
	"grape" text NOT NULL,
	"price" numeric(65, 30) NOT NULL,
	"currentcy" text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User" ("username");
*/