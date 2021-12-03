/*
  Warnings:

  - Added the required column `button_normal` to the `Meme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `button_pressed` to the `Meme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meme" ADD COLUMN     "button_normal" TEXT NOT NULL,
ADD COLUMN     "button_pressed" TEXT NOT NULL;
