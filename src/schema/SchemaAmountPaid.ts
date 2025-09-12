import z from "zod";

export const SchemaAmountPaid = z
	.object({
		amount_paid: z
			.number("Amount paid must be numbers")
			.nonnegative("grand total cannot be negative"),
		id: z.string().optional()
	})


export type IzAmountPaid = z.infer<typeof SchemaAmountPaid>
// & {
// 	id: string;
// };
