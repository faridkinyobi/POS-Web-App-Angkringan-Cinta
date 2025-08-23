-- CreateEnum
CREATE TYPE "public"."role" AS ENUM ('ADMIN', 'OWNER', 'KARSIR', 'MITRA', 'KURIR');

-- CreateEnum
CREATE TYPE "public"."gender" AS ENUM ('laki_laki', 'perempuan');

-- CreateEnum
CREATE TYPE "public"."shift" AS ENUM ('pagi', 'siang');

-- CreateEnum
CREATE TYPE "public"."file_type" AS ENUM ('jpg', 'png', 'svg', 'jpeg', 'webp');

-- CreateEnum
CREATE TYPE "public"."metode_pembayaran" AS ENUM ('tunai', 'transfer', 'midtrans', 'xendit');

-- CreateEnum
CREATE TYPE "public"."status_pembayaran" AS ENUM ('pending', 'paid', 'failed', 'expired', 'refunded');

-- CreateEnum
CREATE TYPE "public"."hari" AS ENUM ('senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu');

-- CreateEnum
CREATE TYPE "public"."TipeTransaksi" AS ENUM ('pemasukan', 'pengeluaran');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "role" "public"."role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Karyawan" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "umur" INTEGER NOT NULL,
    "alamat" VARCHAR(255) NOT NULL,
    "gender" "public"."gender" NOT NULL,
    "user_id" TEXT NOT NULL,
    "creat_by_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Karyawan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Jadwal" (
    "id" TEXT NOT NULL,
    "namaKaryawan" VARCHAR(100) NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "shift_masuk" "public"."shift" NOT NULL,
    "outlite_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jadwal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."jadwal_karyawan" (
    "id" TEXT NOT NULL,
    "jadwal_id" TEXT NOT NULL,
    "karyawan_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jadwal_karyawan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Galery" (
    "id" TEXT NOT NULL,
    "name_file" VARCHAR(100) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "type" "public"."file_type" NOT NULL,
    "karyawan_id" TEXT NOT NULL,
    "menu_id" TEXT NOT NULL,
    "keuangan_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Galery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Menu" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "harga" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."penjualan_menu" (
    "id" TEXT NOT NULL,
    "grand_total" DECIMAL(10,2) NOT NULL,
    "note" VARCHAR(255) NOT NULL,
    "karyawan_id" TEXT NOT NULL,
    "outlite_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "penjualan_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."penjualan_menu_detail" (
    "id" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "harga" DECIMAL(10,2) NOT NULL,
    "Subtotal" DECIMAL(10,2) NOT NULL,
    "menu_id" TEXT NOT NULL,
    "penjualan_menu_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "penjualan_menu_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Outlite" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "alamat" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Outlite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."master_inventory" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "stock" INTEGER NOT NULL,
    "satuan" VARCHAR(100) NOT NULL,
    "katagory" VARCHAR(100) NOT NULL,
    "harga_beli" DECIMAL(10,2) NOT NULL,
    "harga_jual" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."inventory_outlite" (
    "id" TEXT NOT NULL,
    "satuan" VARCHAR(100) NOT NULL,
    "stock" INTEGER NOT NULL,
    "outlite_id" TEXT NOT NULL,
    "master_inventaris_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_outlite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."permintaan_inventory" (
    "id" TEXT NOT NULL,
    "jumlah_item" INTEGER NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "note" VARCHAR(255) NOT NULL,
    "outlite_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permintaan_inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PermintaanInventoryDetail" (
    "id" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "inventory_master_id" TEXT NOT NULL,
    "permintaan_inventory_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PermintaanInventoryDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pengiriman_barang" (
    "id" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "desc" TEXT NOT NULL,
    "outlite_id" TEXT NOT NULL,
    "permintaan_id" TEXT NOT NULL,
    "dikirim_oleh" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pengiriman_barang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pengiriman_barang_detail" (
    "id" TEXT NOT NULL,
    "nama_barang" VARCHAR(100) NOT NULL,
    "qty" INTEGER NOT NULL,
    "pengiriman_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pengiriman_barang_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Mitra" (
    "id" TEXT NOT NULL,
    "kode_mitra" VARCHAR(100) NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "telepon" VARCHAR(50) NOT NULL,
    "alamat" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mitra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mitra_belanja" (
    "id" TEXT NOT NULL,
    "metode_pay" "public"."metode_pembayaran" NOT NULL,
    "payment_status" "public"."status_pembayaran" NOT NULL,
    "grand_total" DECIMAL(10,2) NOT NULL,
    "note" JSONB NOT NULL,
    "mitra_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mitra_belanja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."detail_mitra_belanja" (
    "id" TEXT NOT NULL,
    "qty" TEXT NOT NULL,
    "harga" DECIMAL(10,2) NOT NULL,
    "Subtotal" DECIMAL(10,2) NOT NULL,
    "belanja_mitra_id" TEXT NOT NULL,
    "master_inventory_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "detail_mitra_belanja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."diskon" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "hari" "public"."hari" NOT NULL,
    "diskon" DECIMAL(10,2) NOT NULL,
    "menu_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diskon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."keuangan" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "jumlah" DECIMAL(10,2) NOT NULL,
    "tipe" "public"."TipeTransaksi" NOT NULL,
    "keterangan" VARCHAR(255) NOT NULL,
    "sumber" VARCHAR(100) NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "ref_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "keuangan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "jadwal_karyawan_jadwal_id_karyawan_id_key" ON "public"."jadwal_karyawan"("jadwal_id", "karyawan_id");

-- CreateIndex
CREATE UNIQUE INDEX "Mitra_kode_mitra_key" ON "public"."Mitra"("kode_mitra");

-- AddForeignKey
ALTER TABLE "public"."Karyawan" ADD CONSTRAINT "Karyawan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Karyawan" ADD CONSTRAINT "Karyawan_creat_by_id_fkey" FOREIGN KEY ("creat_by_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Jadwal" ADD CONSTRAINT "Jadwal_outlite_id_fkey" FOREIGN KEY ("outlite_id") REFERENCES "public"."Outlite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."jadwal_karyawan" ADD CONSTRAINT "jadwal_karyawan_jadwal_id_fkey" FOREIGN KEY ("jadwal_id") REFERENCES "public"."Jadwal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."jadwal_karyawan" ADD CONSTRAINT "jadwal_karyawan_karyawan_id_fkey" FOREIGN KEY ("karyawan_id") REFERENCES "public"."Karyawan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Galery" ADD CONSTRAINT "Galery_karyawan_id_fkey" FOREIGN KEY ("karyawan_id") REFERENCES "public"."Karyawan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Galery" ADD CONSTRAINT "Galery_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "public"."Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Galery" ADD CONSTRAINT "Galery_keuangan_id_fkey" FOREIGN KEY ("keuangan_id") REFERENCES "public"."keuangan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."penjualan_menu" ADD CONSTRAINT "penjualan_menu_karyawan_id_fkey" FOREIGN KEY ("karyawan_id") REFERENCES "public"."Karyawan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."penjualan_menu" ADD CONSTRAINT "penjualan_menu_outlite_id_fkey" FOREIGN KEY ("outlite_id") REFERENCES "public"."Outlite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."penjualan_menu_detail" ADD CONSTRAINT "penjualan_menu_detail_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "public"."Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."penjualan_menu_detail" ADD CONSTRAINT "penjualan_menu_detail_penjualan_menu_id_fkey" FOREIGN KEY ("penjualan_menu_id") REFERENCES "public"."penjualan_menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."inventory_outlite" ADD CONSTRAINT "inventory_outlite_outlite_id_fkey" FOREIGN KEY ("outlite_id") REFERENCES "public"."Outlite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."inventory_outlite" ADD CONSTRAINT "inventory_outlite_master_inventaris_id_fkey" FOREIGN KEY ("master_inventaris_id") REFERENCES "public"."master_inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."permintaan_inventory" ADD CONSTRAINT "permintaan_inventory_outlite_id_fkey" FOREIGN KEY ("outlite_id") REFERENCES "public"."Outlite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."permintaan_inventory" ADD CONSTRAINT "permintaan_inventory_dibuat_oleh_fkey" FOREIGN KEY ("dibuat_oleh") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PermintaanInventoryDetail" ADD CONSTRAINT "PermintaanInventoryDetail_inventory_master_id_fkey" FOREIGN KEY ("inventory_master_id") REFERENCES "public"."master_inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PermintaanInventoryDetail" ADD CONSTRAINT "PermintaanInventoryDetail_permintaan_inventory_id_fkey" FOREIGN KEY ("permintaan_inventory_id") REFERENCES "public"."permintaan_inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pengiriman_barang" ADD CONSTRAINT "pengiriman_barang_outlite_id_fkey" FOREIGN KEY ("outlite_id") REFERENCES "public"."Outlite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pengiriman_barang" ADD CONSTRAINT "pengiriman_barang_permintaan_id_fkey" FOREIGN KEY ("permintaan_id") REFERENCES "public"."permintaan_inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pengiriman_barang" ADD CONSTRAINT "pengiriman_barang_dikirim_oleh_fkey" FOREIGN KEY ("dikirim_oleh") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pengiriman_barang_detail" ADD CONSTRAINT "pengiriman_barang_detail_pengiriman_id_fkey" FOREIGN KEY ("pengiriman_id") REFERENCES "public"."pengiriman_barang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mitra_belanja" ADD CONSTRAINT "mitra_belanja_mitra_id_fkey" FOREIGN KEY ("mitra_id") REFERENCES "public"."Mitra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mitra_belanja" ADD CONSTRAINT "mitra_belanja_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."detail_mitra_belanja" ADD CONSTRAINT "detail_mitra_belanja_belanja_mitra_id_fkey" FOREIGN KEY ("belanja_mitra_id") REFERENCES "public"."mitra_belanja"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."detail_mitra_belanja" ADD CONSTRAINT "detail_mitra_belanja_master_inventory_id_fkey" FOREIGN KEY ("master_inventory_id") REFERENCES "public"."master_inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."diskon" ADD CONSTRAINT "diskon_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "public"."Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
