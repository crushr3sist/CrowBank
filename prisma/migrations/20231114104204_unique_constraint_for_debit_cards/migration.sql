/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `Debit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Debit_accountId_key" ON "Debit"("accountId");
