-- CreateTable
CREATE TABLE `Wine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `prodYear` DATE NOT NULL,
    `producer` VARCHAR(191) NOT NULL,
    `alcohol` DECIMAL(65, 30) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `grape` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `currentcy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
