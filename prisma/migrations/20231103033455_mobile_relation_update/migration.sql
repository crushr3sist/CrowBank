/*
  Warnings:

  - The primary key for the `MobileOTPSecret` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `MobileOTPSecret` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `MobileOTPSecret` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MobileOTPSecret" DROP CONSTRAINT "MobileOTPSecret_secret_fkey";

-- AlterTable
ALTER TABLE "MobileOTPSecret" DROP CONSTRAINT "MobileOTPSecret_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "MobileOTPSecret_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "MobileOTPSecret" ADD CONSTRAINT "MobileOTPSecret_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
