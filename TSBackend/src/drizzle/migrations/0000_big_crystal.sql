-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `User` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(255),
	`birthday` date,
	`gender` enum('MALE','FEMALE'),
	`username` varchar(255),
	`password` varchar(255),
	CONSTRAINT `User_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `WSET` (
	`id` int AUTO_INCREMENT NOT NULL,
	`aIntensity` enum('Low','Medium','High'),
	`nIntensity` enum('Low','Medium','High'),
	`sweetness` enum('Dry','Medium','Sweet'),
	`aromaCharacteristics` text,
	`acidity` enum('Low','Medium','High'),
	`tannin` enum('Low','Medium','High'),
	`alcohol` enum('Low','Medium','High'),
	`body` enum('Light','Medium','Full'),
	`flavourIntensity` enum('Low','Medium','High'),
	`flavourCharacteristics` text,
	`finish` enum('Short','Medium','Long'),
	`quality` enum('Poor','Fair','Good','Very Good','Excellent'),
	CONSTRAINT `WSET_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Wine` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`country` varchar(255),
	`region` varchar(255),
	`prodYear` date,
	`producer` varchar(255),
	`alcohol` decimal(5,2),
	`type` varchar(255),
	`grape` varchar(255),
	`price` decimal(10,2),
	`currency` varchar(3),
	CONSTRAINT `Wine_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `WineEvaluation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`wineId` int,
	`userId` int,
	`evaluationName` varchar(255),
	`note` text,
	CONSTRAINT `WineEvaluation_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `WineTasting` (
	`id` int AUTO_INCREMENT NOT NULL,
	`visibility` enum('Public','Private'),
	`date` date,
	`hostId` int,
	`winnerId` int,
	`finished` tinyint,
	`title` varchar(255),
	CONSTRAINT `WineTasting_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `WineTasting_Participants` (
	`wineTastingId` int NOT NULL,
	`userId` int NOT NULL,
	CONSTRAINT `WineTasting_Participants_wineTastingId_userId` PRIMARY KEY(`wineTastingId`,`userId`)
);
--> statement-breakpoint
CREATE TABLE `WineTasting_Wines` (
	`wineTastingId` int NOT NULL,
	`wineId` int NOT NULL,
	CONSTRAINT `WineTasting_Wines_wineTastingId_wineId` PRIMARY KEY(`wineTastingId`,`wineId`)
);
--> statement-breakpoint
CREATE TABLE `_prisma_migrations` (
	`id` varchar(36) NOT NULL,
	`checksum` varchar(64) NOT NULL,
	`finished_at` datetime(3),
	`migration_name` varchar(255) NOT NULL,
	`logs` text,
	`rolled_back_at` datetime(3),
	`started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`applied_steps_count` int unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `_prisma_migrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `userId` ON `WineEvaluation` (`userId`);--> statement-breakpoint
CREATE INDEX `wineId` ON `WineEvaluation` (`wineId`);--> statement-breakpoint
CREATE INDEX `hostId` ON `WineTasting` (`hostId`);--> statement-breakpoint
CREATE INDEX `winnerId` ON `WineTasting` (`winnerId`);--> statement-breakpoint
CREATE INDEX `userId` ON `WineTasting_Participants` (`userId`);--> statement-breakpoint
CREATE INDEX `wineId` ON `WineTasting_Wines` (`wineId`);--> statement-breakpoint
ALTER TABLE `WineEvaluation` ADD CONSTRAINT `WineEvaluation_ibfk_1` FOREIGN KEY (`wineId`) REFERENCES `Wine`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `WineEvaluation` ADD CONSTRAINT `WineEvaluation_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `WineTasting` ADD CONSTRAINT `WineTasting_ibfk_1` FOREIGN KEY (`hostId`) REFERENCES `User`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `WineTasting` ADD CONSTRAINT `WineTasting_ibfk_2` FOREIGN KEY (`winnerId`) REFERENCES `Wine`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `WineTasting_Participants` ADD CONSTRAINT `WineTasting_Participants_ibfk_1` FOREIGN KEY (`wineTastingId`) REFERENCES `WineTasting`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `WineTasting_Participants` ADD CONSTRAINT `WineTasting_Participants_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `WineTasting_Wines` ADD CONSTRAINT `WineTasting_Wines_ibfk_1` FOREIGN KEY (`wineTastingId`) REFERENCES `WineTasting`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `WineTasting_Wines` ADD CONSTRAINT `WineTasting_Wines_ibfk_2` FOREIGN KEY (`wineId`) REFERENCES `Wine`(`id`) ON DELETE no action ON UPDATE no action;
*/