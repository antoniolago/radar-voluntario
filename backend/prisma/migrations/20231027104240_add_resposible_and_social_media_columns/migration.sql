/*
  Warnings:

  - Added the required column `responsible_name` to the `institutions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsible_phone` to the `institutions` table without a default value. This is not possible if the table is not empty.
  - Made the column `about` on table `institutions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "institutions" ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "responsible_name" TEXT NOT NULL,
ADD COLUMN     "responsible_phone" TEXT NOT NULL,
ALTER COLUMN "about" SET NOT NULL;
