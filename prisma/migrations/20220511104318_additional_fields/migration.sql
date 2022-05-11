-- AlterTable
ALTER TABLE `User` ADD COLUMN `token` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `discord_id` VARCHAR(191) NULL,
    MODIFY `is_subscribed` BOOLEAN NOT NULL DEFAULT false;
