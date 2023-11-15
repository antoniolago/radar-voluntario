/*
  Warnings:

  - You are about to drop the column `responsible_name` on the `institutions` table. All the data in the column will be lost.
  - You are about to drop the column `responsible_phone` on the `institutions` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `institutions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institutions" DROP COLUMN "responsible_name",
DROP COLUMN "responsible_phone",
ADD COLUMN     "owner_id" TEXT NOT NULL,
ADD COLUMN     "telephone" TEXT;

-- AddForeignKey
ALTER TABLE "institutions" ADD CONSTRAINT "institutions_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
