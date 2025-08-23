/*
  Warnings:

  - Added the required column `amount_paid` to the `mitra_belanja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refund` to the `mitra_belanja` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."mitra_belanja" ADD COLUMN     "amount_paid" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "refund" DECIMAL(10,2) NOT NULL;
