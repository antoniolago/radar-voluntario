/*
  Warnings:

  - Added the required column `complement` to the `institutions_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institutions_addresses" ADD COLUMN     "complement" TEXT NOT NULL;
