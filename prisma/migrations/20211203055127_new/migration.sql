/*
  Warnings:

  - Added the required column `button_normal` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `button_pressed` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "button_normal" TEXT NOT NULL,
ADD COLUMN     "button_pressed" TEXT NOT NULL;
