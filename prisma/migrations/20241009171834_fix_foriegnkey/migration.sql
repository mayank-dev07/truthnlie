-- DropForeignKey
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_wallet_fkey";

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_wallet_fkey" FOREIGN KEY ("wallet") REFERENCES "User"("wallet") ON DELETE RESTRICT ON UPDATE CASCADE;
