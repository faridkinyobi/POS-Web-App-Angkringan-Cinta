import { prisma } from "@/lib/prisma";
import { IzMasterInventory, SchemaQueryParams } from "@/schema";
import { IQueryParams } from "@/types";
import { Prisma } from "@prisma/client";
export const Create = async (data: Prisma.MasterInventoryCreateInput) => {
	return await prisma.masterInventory.create({
		data,
	});
};

export const Get = async (query: IQueryParams) => {
	const { search = "" } = query;
	const parsed = SchemaQueryParams.parse(query);
	const trimmedSearch = search.trim();
	const numericSearch = parseFloat(trimmedSearch);
	const isNumber = !isNaN(numericSearch);

	return await prisma.masterInventory.findMany({
		select: {
			id: true,
			name: true,
			stock: true,
			satuan: true,
			katagory: true,
			harga_jual: true,
			harga_beli: true,
		},
		where: {
			OR: [
				{ name: { contains: trimmedSearch, mode: "insensitive" } },
				{ katagory: { contains: trimmedSearch, mode: "insensitive" } },
				...(isNumber
					? [
						{ harga_beli: { equals: numericSearch } },
						{ harga_jual: { equals: numericSearch } },
					]
					: []),
			],
		},
		skip: (Number(parsed.page) - 1) * Number(parsed.perPage),
		take: Number(parsed.perPage),
	});
};
export const count = async () => await prisma.masterInventory.count();

export const getByName = async (name: string) => {
	return await prisma.masterInventory.findFirst({
		where: { name },
	});
};
export const Delete = async (id: string) => {
	return await prisma.masterInventory.delete({
		where: { id },
	});
};
export const GetById = async (id: string) => {
	return await prisma.masterInventory.findUnique({
		where: { id },
	});
};
export const Update = async (id: string, body: IzMasterInventory) => {
	return await prisma.masterInventory.update({
		where: { id },
		data: body,
	});
};
