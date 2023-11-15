/*
  Warnings:

  - Added the required column `end_date` to the `opportunities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `opportunities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "opportunities" ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "online" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;
