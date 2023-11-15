/*
  Warnings:

  - Added the required column `name` to the `institutions_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institutions_addresses" ADD COLUMN     "name" TEXT NOT NULL;
