-- DropForeignKey
ALTER TABLE "opportunities" DROP CONSTRAINT "opportunities_address_id_fkey";

-- AlterTable
ALTER TABLE "opportunities" ALTER COLUMN "address_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "institutions_addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
