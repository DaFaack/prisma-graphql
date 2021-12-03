/*
  Warnings:

  - You are about to drop the column `button_normal` on the `Meme` table. All the data in the column will be lost.
  - You are about to drop the column `button_pressed` on the `Meme` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Meme" DROP COLUMN "button_normal",
DROP COLUMN "button_pressed";
