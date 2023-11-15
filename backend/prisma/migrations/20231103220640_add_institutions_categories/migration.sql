-- CreateTable
CREATE TABLE "institutions_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL,

    CONSTRAINT "institutions_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opportunities_categories" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "opportunity_id" TEXT NOT NULL,

    CONSTRAINT "opportunities_categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "institutions_categories" ADD CONSTRAINT "institutions_categories_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunities_categories" ADD CONSTRAINT "opportunities_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "institutions_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunities_categories" ADD CONSTRAINT "opportunities_categories_opportunity_id_fkey" FOREIGN KEY ("opportunity_id") REFERENCES "opportunities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
