/*
  Warnings:

  - You are about to drop the column `cardNumber` on the `Debit` table. All the data in the column will be lost.
  - You are about to drop the column `cvv` on the `Debit` table. All the data in the column will be lost.
  - You are about to drop the column `pin` on the `Debit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ATMPin]` on the table `Debit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[CardNumber]` on the table `Debit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[CVV]` on the table `Debit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ATMPin` to the `Debit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CVV` to the `Debit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CardExpiryDate` to the `Debit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CardHolderName` to the `Debit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CardIssuedDate` to the `Debit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CardNumber` to the `Debit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CardType` to the `Debit` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Debit_cardNumber_key";

-- DropIndex
DROP INDEX "Debit_cvv_key";

-- DropIndex
DROP INDEX "Debit_pin_key";

-- AlterTable
ALTER TABLE "Debit" DROP COLUMN "cardNumber",
DROP COLUMN "cvv",
DROP COLUMN "pin",
ADD COLUMN     "ATMPin" TEXT NOT NULL,
ADD COLUMN     "CVV" TEXT NOT NULL,
ADD COLUMN     "CardExpiryDate" TEXT NOT NULL,
ADD COLUMN     "CardHolderName" TEXT NOT NULL,
ADD COLUMN     "CardIssuedDate" TEXT NOT NULL,
ADD COLUMN     "CardNumber" TEXT NOT NULL,
ADD COLUMN     "CardType" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Debit_ATMPin_key" ON "Debit"("ATMPin");

-- CreateIndex
CREATE UNIQUE INDEX "Debit_CardNumber_key" ON "Debit"("CardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Debit_CVV_key" ON "Debit"("CVV");
