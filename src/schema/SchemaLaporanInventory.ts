import z from "zod";

export const SchemaLaporanInventory = z.object({
    stock_awal: z.number(),
    stock_masuk: z.number().nonnegative("Stock in cannot be negative").min(0, 'stock cannot be empty"'),
    stock_keluar: z.number().nonnegative("Stock out cannot be negative").min(0, 'stock cannot be empty"'),
    stock_akhir: z.number(),
    status: z.enum(["INIT", "IN", "OUT", "TRANSFER", "RETURN"]),      //EXPIRED / DAMAGED/ADJUSTMENT      
    nilai_pembelian: z.number(),
    nilai_penjualan: z.number(),
    laba: z.number(),
})
export const InventoryStatusEnum = z.enum(["INIT", "IN", "OUT", "TRANSFER", "RETURN"]);
export type IzStatusEnumInventory = z.infer<typeof InventoryStatusEnum>

export const SchemaInOutInventory = z.object({
    id: z.string(),
    qty: z.number(),
    status: InventoryStatusEnum,      //EXPIRED / DAMAGED/ADJUSTMENT 
})
export type IzInOutInventory = z.infer<typeof SchemaInOutInventory>

export type IzLaporanInventory = z.infer<typeof SchemaLaporanInventory> & {
    harga_beli: number
    harga_jual: number
    stock: number
    id: string
    qty: number
}