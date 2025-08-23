import z from "zod";

export const ZMetodePembayaran = z.enum(["tunai", "transfer", "midtrans", "xendit"]);
export type TMetodePembayaran = z.infer<typeof ZMetodePembayaran>;

export const ZStatusPembayaran = z.enum(["pending", "paid", "failed", "expired", "refunded"]);
export type TStatusPembayaran = z.infer<typeof ZStatusPembayaran>;


export const SchemaDetailItems = z.object({
	id: z.string().nonempty("Id cannot be empty"),
	name: z.string().nonempty("Name cannot be empty"),
	harga: z.number("Prices must be numbers"),
	qty: z.number().min(1, "jumlah minimal 1"),
	Subtotal: z.number("subtotal must be numbers")

})

export const SchemaBlanjaMitra = z.object({
	metode_pay: ZMetodePembayaran,
	payment_status: ZStatusPembayaran,
	grand_total: z
		.number("Prices must be numbers")
		.nonnegative("grand total cannot be negative")
		.refine((val) => val > 3, {
			message: "grand total beli harus lebih dari 0",
		}),
	amount_paid: z
		.number("Prices must be numbers")
		.nonnegative("grand total cannot be negative")
		.refine((val) => val > 1000, {
			message: "grand total beli harus lebih dari 3a",
		}),
	refund: z.number("Prices must be numbers"),
	note: z.string().optional(),
	order_code: z.string().optional(),
	mitra_id: z.string().nonempty("mitra cannot be empty").min(5, "mitra wajib"),
	user_id: z.string().nonempty("ID user cannot be empty").min(5, "master_inventory_id wajib").optional(),
	DetailMitraBelanja: z.array(SchemaDetailItems).min(1, "minimal 1 item"),
});

export type IzBlanjaMitra = z.infer<typeof SchemaBlanjaMitra>

export type IzDetailItems = z.infer<typeof SchemaDetailItems>