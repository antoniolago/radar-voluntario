/*
  Warnings:

  - Added the required column `address_id` to the `opportunities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "opportunities" ADD COLUMN     "address_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "picture" TEXT;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "institutions_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
