/*
  Warnings:

  - You are about to drop the column `address` on the `institutions_addresses` table. All the data in the column will be lost.
  - Added the required column `street` to the `institutions_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institutions_addresses" DROP COLUMN "address",
ADD COLUMN     "street" TEXT NOT NULL;
