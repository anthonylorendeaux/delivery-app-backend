/*
  Warnings:

  - You are about to drop the column `refferedId` on the `Referrer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[referedId]` on the table `Referrer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referedId` to the `Referrer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Referrer` DROP FOREIGN KEY `Referrer_refferedId_fkey`;

-- AlterTable
ALTER TABLE `Referrer` DROP COLUMN `refferedId`,
    ADD COLUMN `referedId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Referrer_referedId_key` ON `Referrer`(`referedId`);

-- AddForeignKey
ALTER TABLE `Referrer` ADD CONSTRAINT `Referrer_referedId_fkey` FOREIGN KEY (`referedId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
