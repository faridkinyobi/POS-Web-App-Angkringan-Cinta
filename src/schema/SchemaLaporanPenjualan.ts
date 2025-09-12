import z from "zod";


export const SchemaMasterInventoryy = z.object({
    name: z.string(),
    kode_barang: z.string(),
    harga_beli: z.number().nonnegative("Harga beli tidak boleh negatif").min(0, "Harga beli tidak boleh kosong"),
    harga_jual: z.number().nonnegative("Harga jual tidak boleh negatif").min(0, "Harga jual tidak boleh kosong"),
});

export const SchemaLaporanPenjualan = z.object({
    id: z.string().optional(),
    qty: z.number().nonnegative("Qty tidak boleh negatif"),
    omzet: z.number().nonnegative("Omzet tidak boleh negatif"),
    labaKotor: z.number(),
    masterInventory: SchemaMasterInventoryy,
});


export type IzLaporanPenjualan = z.infer<typeof SchemaLaporanPenjualan> & {
    createdAt: Date
}
