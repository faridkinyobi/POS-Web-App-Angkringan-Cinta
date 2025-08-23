/*
  Warnings:

  - A unique constraint covering the columns `[order_code]` on the table `mitra_belanja` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."mitra_belanja" ADD COLUMN     "order_code" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "mitra_belanja_order_code_key" ON "public"."mitra_belanja"("order_code");
