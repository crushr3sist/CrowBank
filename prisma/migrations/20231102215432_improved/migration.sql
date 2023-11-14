/*
  Warnings:

  - The primary key for the `MobileOTPSecret` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Secret` on the `MobileOTPSecret` table. All the data in the column will be lost.
  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reciver` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Incidences` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Credit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Debit` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Credit` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Debit` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `secret` to the `MobileOTPSecret` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Transaction` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `receiver` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Credit" DROP CONSTRAINT "Credit_userId_fkey";

-- DropForeignKey
ALTER TABLE "Debit" DROP CONSTRAINT "Debit_userId_fkey";

-- DropForeignKey
ALTER TABLE "Incidences" DROP CONSTRAINT "Incidences_creditId_fkey";

-- DropForeignKey
ALTER TABLE "Incidences" DROP CONSTRAINT "Incidences_debitId_fkey";

-- DropForeignKey
ALTER TABLE "MobileOTPSecret" DROP CONSTRAINT "MobileOTPSecret_Secret_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_transactionId_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Credit" ADD COLUMN     "accountId" INTEGER,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Debit" ADD COLUMN     "accountId" INTEGER,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "MobileOTPSecret" DROP CONSTRAINT "MobileOTPSecret_pkey",
DROP COLUMN "Secret",
ADD COLUMN     "secret" TEXT NOT NULL,
ADD CONSTRAINT "MobileOTPSecret_pkey" PRIMARY KEY ("secret");

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
DROP COLUMN "reciver",
DROP COLUMN "transactionId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "receiver" TEXT NOT NULL,
ADD COLUMN     "senderId" INTEGER,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Incidences";

-- CreateTable
CREATE TABLE "Incidence" (
    "id" TEXT NOT NULL,
    "creditId" INTEGER,
    "debitId" INTEGER,
    "message" TEXT NOT NULL,
    "dateOfIncidence" TEXT NOT NULL,

    CONSTRAINT "Incidence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credit_userId_key" ON "Credit"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Debit_userId_key" ON "Debit"("userId");

-- AddForeignKey
ALTER TABLE "MobileOTPSecret" ADD CONSTRAINT "MobileOTPSecret_secret_fkey" FOREIGN KEY ("secret") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debit" ADD CONSTRAINT "Debit_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credit" ADD CONSTRAINT "Credit_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incidence" ADD CONSTRAINT "Incidence_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "Credit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incidence" ADD CONSTRAINT "Incidence_debitId_fkey" FOREIGN KEY ("debitId") REFERENCES "Debit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
