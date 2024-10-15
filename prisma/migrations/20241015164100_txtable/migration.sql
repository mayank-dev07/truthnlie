-- CreateTable
CREATE TABLE "Transaction" (
    "TxID" SERIAL NOT NULL,
    "challengeId" TEXT NOT NULL,
    "TxHash" TEXT NOT NULL,
    "ToUser" TEXT NOT NULL,
    "FromUser" TEXT NOT NULL,
    "TokenAmount" DOUBLE PRECISION NOT NULL,
    "Token" TEXT NOT NULL,
    "TxState" TEXT NOT NULL,
    "Timestamp" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("TxID")
);
