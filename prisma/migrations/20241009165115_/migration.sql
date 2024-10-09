/*
  Warnings:

  - You are about to drop the column `challengerId` on the `Challenge` table. All the data in the column will be lost.
  - You are about to drop the column `guessIndex` on the `Challenge` table. All the data in the column will be lost.
  - Added the required column `maxChallengers` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_challengerId_fkey";

-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "challengerId",
DROP COLUMN "guessIndex",
ADD COLUMN     "correctGuesses" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "incorrectGuesses" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "maxChallengers" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_ReceivedChallenges" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ReceivedChallenges_AB_unique" ON "_ReceivedChallenges"("A", "B");

-- CreateIndex
CREATE INDEX "_ReceivedChallenges_B_index" ON "_ReceivedChallenges"("B");

-- AddForeignKey
ALTER TABLE "_ReceivedChallenges" ADD CONSTRAINT "_ReceivedChallenges_A_fkey" FOREIGN KEY ("A") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReceivedChallenges" ADD CONSTRAINT "_ReceivedChallenges_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
