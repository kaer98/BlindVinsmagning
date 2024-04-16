-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(255) NULL,
    `birthday` DATE NULL,
    `gender` ENUM('MALE', 'FEMALE') NULL,
    `username` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WSET` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aIntensity` ENUM('Low', 'Medium', 'High') NULL,
    `nIntensity` ENUM('Low', 'Medium', 'High') NULL,
    `sweetness` ENUM('Dry', 'Medium', 'Sweet') NULL,
    `aromaCharacteristics` TEXT NULL,
    `acidity` ENUM('Low', 'Medium', 'High') NULL,
    `tannin` ENUM('Low', 'Medium', 'High') NULL,
    `alcohol` ENUM('Low', 'Medium', 'High') NULL,
    `body` ENUM('Light', 'Medium', 'Full') NULL,
    `flavourIntensity` ENUM('Low', 'Medium', 'High') NULL,
    `flavourCharacteristics` TEXT NULL,
    `finish` ENUM('Short', 'Medium', 'Long') NULL,
    `quality` ENUM('Poor', 'Fair', 'Good', 'Very Good', 'Excellent') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,
    `region` VARCHAR(255) NULL,
    `prodYear` DATE NULL,
    `producer` VARCHAR(255) NULL,
    `alcohol` DECIMAL(5, 2) NULL,
    `type` VARCHAR(255) NULL,
    `grape` VARCHAR(255) NULL,
    `price` DECIMAL(10, 2) NULL,
    `currency` VARCHAR(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WineEvaluation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `wineId` INTEGER NULL,
    `userId` INTEGER NULL,
    `evaluationName` VARCHAR(255) NULL,
    `note` TEXT NULL,

    INDEX `userId`(`userId`),
    INDEX `wineId`(`wineId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WineTasting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `visibility` ENUM('Public', 'Private') NULL,
    `date` DATE NULL,
    `hostId` INTEGER NULL,
    `winnerId` INTEGER NULL,
    `finished` BOOLEAN NULL,

    INDEX `hostId`(`hostId`),
    INDEX `winnerId`(`winnerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WineTasting_Participants` (
    `wineTastingId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `userId`(`userId`),
    PRIMARY KEY (`wineTastingId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WineTasting_Wines` (
    `wineTastingId` INTEGER NOT NULL,
    `wineId` INTEGER NOT NULL,

    INDEX `wineId`(`wineId`),
    PRIMARY KEY (`wineTastingId`, `wineId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WineEvaluation` ADD CONSTRAINT `WineEvaluation_ibfk_1` FOREIGN KEY (`wineId`) REFERENCES `Wine`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `WineEvaluation` ADD CONSTRAINT `WineEvaluation_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `WineTasting` ADD CONSTRAINT `WineTasting_ibfk_1` FOREIGN KEY (`hostId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `WineTasting` ADD CONSTRAINT `WineTasting_ibfk_2` FOREIGN KEY (`winnerId`) REFERENCES `Wine`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `WineTasting_Participants` ADD CONSTRAINT `WineTasting_Participants_ibfk_1` FOREIGN KEY (`wineTastingId`) REFERENCES `WineTasting`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `WineTasting_Participants` ADD CONSTRAINT `WineTasting_Participants_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `WineTasting_Wines` ADD CONSTRAINT `WineTasting_Wines_ibfk_1` FOREIGN KEY (`wineTastingId`) REFERENCES `WineTasting`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `WineTasting_Wines` ADD CONSTRAINT `WineTasting_Wines_ibfk_2` FOREIGN KEY (`wineId`) REFERENCES `Wine`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
