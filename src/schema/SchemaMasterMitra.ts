import z from "zod";

export const SchemaMasterMitra = z.object({
	nama: z.string().nonempty("Name cannot be empty"),
	telepon: z
		.string()
		.nonempty("Telepon cannot be empty")
		.regex(/^\d+$/, "Telepon must contain only numbers"),
	alamat: z.string().nonempty("Alamat cannot be empty"),
	kode_mitra: z.string().nonempty("ID Mitra is required"),
});

export type IzMasterMitra = z.infer<typeof SchemaMasterMitra> & {
	id: string;
};
