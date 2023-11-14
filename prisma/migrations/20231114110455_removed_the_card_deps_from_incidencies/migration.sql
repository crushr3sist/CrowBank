/*
  Warnings:

  - You are about to drop the column `creditId` on the `Incidence` table. All the data in the column will be lost.
  - You are about to drop the column `debitId` on the `Incidence` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Incidence" DROP CONSTRAINT "Incidence_creditId_fkey";

-- DropForeignKey
ALTER TABLE "Incidence" DROP CONSTRAINT "Incidence_debitId_fkey";

-- AlterTable
ALTER TABLE "Incidence" DROP COLUMN "creditId",
DROP COLUMN "debitId",
ADD COLUMN     "accountId" INTEGER;

-- AddForeignKey
ALTER TABLE "Incidence" ADD CONSTRAINT "Incidence_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
