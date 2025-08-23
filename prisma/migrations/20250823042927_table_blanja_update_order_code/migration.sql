/*
  Warnings:

  - Made the column `order_code` on table `mitra_belanja` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."mitra_belanja_order_code_key";

-- AlterTable
ALTER TABLE "public"."mitra_belanja" ALTER COLUMN "order_code" SET NOT NULL;
