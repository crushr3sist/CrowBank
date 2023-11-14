-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobileOTPSecret" (
    "Secret" TEXT NOT NULL,

    CONSTRAINT "MobileOTPSecret_pkey" PRIMARY KEY ("Secret")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Debit" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "pin" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "savings" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Debit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credit" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "pin" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "deposit" DOUBLE PRECISION NOT NULL,
    "balanceInUse" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Credit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incidences" (
    "incidenceRef" TEXT NOT NULL,
    "creditId" INTEGER,
    "debitId" INTEGER,
    "incidentMessage" TEXT NOT NULL,
    "dateOfIncidence" TEXT NOT NULL,

    CONSTRAINT "Incidences_pkey" PRIMARY KEY ("incidenceRef")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionId" TEXT NOT NULL,
    "amountTransacted" DOUBLE PRECISION NOT NULL,
    "reciver" TEXT NOT NULL,
    "dateOfTransaction" TEXT NOT NULL,
    "feesApplied" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Debit_pin_key" ON "Debit"("pin");

-- CreateIndex
CREATE UNIQUE INDEX "Debit_cardNumber_key" ON "Debit"("cardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Debit_cvv_key" ON "Debit"("cvv");

-- CreateIndex
CREATE UNIQUE INDEX "Credit_pin_key" ON "Credit"("pin");

-- CreateIndex
CREATE UNIQUE INDEX "Credit_cardNumber_key" ON "Credit"("cardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Credit_cvv_key" ON "Credit"("cvv");

-- AddForeignKey
ALTER TABLE "MobileOTPSecret" ADD CONSTRAINT "MobileOTPSecret_Secret_fkey" FOREIGN KEY ("Secret") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debit" ADD CONSTRAINT "Debit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Account"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credit" ADD CONSTRAINT "Credit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Account"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incidences" ADD CONSTRAINT "Incidences_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "Credit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incidences" ADD CONSTRAINT "Incidences_debitId_fkey" FOREIGN KEY ("debitId") REFERENCES "Debit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
