/*
  Warnings:

  - You are about to drop the column `title` on the `WineEvaluation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `WineEvaluation` DROP COLUMN `title`;

-- AlterTable
ALTER TABLE `WineTasting` ADD COLUMN `title` VARCHAR(255) NULL;
