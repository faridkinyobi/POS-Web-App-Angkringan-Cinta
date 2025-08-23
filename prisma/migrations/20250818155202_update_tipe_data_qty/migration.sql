/*
  Warnings:

  - Changed the type of `qty` on the `detail_mitra_belanja` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."detail_mitra_belanja" DROP COLUMN "qty",
ADD COLUMN     "qty" INTEGER NOT NULL;
