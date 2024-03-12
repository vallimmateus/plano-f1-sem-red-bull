/*
  Warnings:

  - A unique constraint covering the columns `[position,round,season]` on the table `Points` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `round` to the `Points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `season` to the `Points` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Points" ADD COLUMN     "round" TEXT NOT NULL,
ADD COLUMN     "season" TEXT NOT NULL,
ALTER COLUMN "position" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Points_position_round_season_key" ON "Points"("position", "round", "season");
