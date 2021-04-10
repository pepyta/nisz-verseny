/*
  Warnings:

  - A unique constraint covering the columns `[emoji,userId,postId]` on the table `reactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `reactions.emoji_userId_postId_unique` ON `reactions`(`emoji`, `userId`, `postId`);
