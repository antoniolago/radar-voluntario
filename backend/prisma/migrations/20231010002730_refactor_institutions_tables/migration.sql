/*
  Warnings:

  - You are about to drop the column `latitude` on the `institutions` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `institutions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "institutions" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "about" TEXT;

-- CreateTable
CREATE TABLE "institutions_addresses" (
    "id" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "institutions_addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "institutions_addresses" ADD CONSTRAINT "institutions_addresses_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
