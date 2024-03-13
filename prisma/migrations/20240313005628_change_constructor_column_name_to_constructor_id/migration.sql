/*
  Warnings:

  - You are about to drop the column `constructor` on the `Points` table. All the data in the column will be lost.
  - Added the required column `constructorId` to the `Points` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Points" DROP COLUMN "constructor",
ADD COLUMN     "constructorId" TEXT NOT NULL;
