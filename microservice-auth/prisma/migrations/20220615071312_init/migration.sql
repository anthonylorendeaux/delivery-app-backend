-- CreateTable
CREATE TABLE `Referrer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `refferedId` INTEGER NOT NULL,

    UNIQUE INDEX `Referrer_refferedId_key`(`refferedId`),
    UNIQUE INDEX `Referrer_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Referrer` ADD CONSTRAINT `Referrer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referrer` ADD CONSTRAINT `Referrer_refferedId_fkey` FOREIGN KEY (`refferedId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
