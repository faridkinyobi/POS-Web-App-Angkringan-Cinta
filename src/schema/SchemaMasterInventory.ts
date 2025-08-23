import z from "zod";

export const SchemaMasterInventory = z
	.object({
		name: z.string().nonempty("Name cannot be empty"),
		stock: z
			.number("Stock must be a number")
			.nonnegative("Stock cannot be negative")
			.min(0, "stok tidak boleh kosong"),
		satuan: z.string().nonempty("Name cannot be empty"), //pack,kg,pcs,dus,
		katagory: z.string(), //bahan
		harga_beli: z
			.number("Prices must be numbers")
			.nonnegative("harga cannot be negative")
			.refine((val) => val > 3, {
				message: "Harga beli harus lebih dari 0",
			}),
		harga_jual: z
			.number("Prices must be numbers")
			.nonnegative("harga cannot be negative")
			.refine((val) => val > 3, {
				message: "Harga beli harus lebih dari 0",
			}),
	})
	.refine((data) => data.harga_jual >= data.harga_beli, {
		message: "The selling price cannot be less than the buying price",
		path: ["harga_jual"],
	});

export type IzMasterInventory = z.infer<typeof SchemaMasterInventory> & {
	id: string;
};
