/*
  Warnings:

  - Added the required column `categoryId` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `messages` ADD COLUMN     `categoryId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `messages` ADD FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
