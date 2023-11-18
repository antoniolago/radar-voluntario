-- DropForeignKey
ALTER TABLE "institutions" DROP CONSTRAINT "institutions_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "institutions_addresses" DROP CONSTRAINT "institutions_addresses_institution_id_fkey";

-- DropForeignKey
ALTER TABLE "institutions_users" DROP CONSTRAINT "institutions_users_institution_id_fkey";

-- DropForeignKey
ALTER TABLE "institutions_users" DROP CONSTRAINT "institutions_users_user_id_fkey";

-- DropForeignKey
ALTER TABLE "opportunities" DROP CONSTRAINT "opportunities_institution_id_fkey";

-- DropForeignKey
ALTER TABLE "opportunities_users" DROP CONSTRAINT "opportunities_users_opportunity_id_fkey";

-- DropForeignKey
ALTER TABLE "opportunities_users" DROP CONSTRAINT "opportunities_users_user_id_fkey";

-- AddForeignKey
ALTER TABLE "institutions" ADD CONSTRAINT "institutions_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institutions_addresses" ADD CONSTRAINT "institutions_addresses_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institutions_users" ADD CONSTRAINT "institutions_users_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institutions_users" ADD CONSTRAINT "institutions_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunities_users" ADD CONSTRAINT "opportunities_users_opportunity_id_fkey" FOREIGN KEY ("opportunity_id") REFERENCES "opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunities_users" ADD CONSTRAINT "opportunities_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
