/*
  Warnings:

  - You are about to alter the column `order_code` on the `mitra_belanja` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "public"."mitra_belanja" ALTER COLUMN "order_code" SET DATA TYPE VARCHAR(255);
