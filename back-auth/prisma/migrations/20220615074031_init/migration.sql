/*
  Warnings:

  - You are about to drop the `Referrer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Referrer` DROP FOREIGN KEY `Referrer_referedId_fkey`;

-- DropForeignKey
ALTER TABLE `Referrer` DROP FOREIGN KEY `Referrer_userId_fkey`;

-- DropTable
DROP TABLE `Referrer`;

-- CreateTable
CREATE TABLE `Referer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `referedId` INTEGER NULL,

    UNIQUE INDEX `Referer_referedId_key`(`referedId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Referer` ADD CONSTRAINT `Referer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referer` ADD CONSTRAINT `Referer_referedId_fkey` FOREIGN KEY (`referedId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
