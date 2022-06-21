-- DropForeignKey
ALTER TABLE `Referrer` DROP FOREIGN KEY `Referrer_referedId_fkey`;

-- DropForeignKey
ALTER TABLE `Referrer` DROP FOREIGN KEY `Referrer_userId_fkey`;

-- AlterTable
ALTER TABLE `Referrer` MODIFY `userId` INTEGER NULL,
    MODIFY `referedId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Referrer` ADD CONSTRAINT `Referrer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referrer` ADD CONSTRAINT `Referrer_referedId_fkey` FOREIGN KEY (`referedId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
