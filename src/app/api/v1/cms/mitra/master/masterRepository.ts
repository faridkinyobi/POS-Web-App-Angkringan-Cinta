import { prisma } from "@/lib/prisma";
import { SchemaQueryParams } from "@/schema";

import { IzMasterMitra } from "@/schema/SchemaMasterMitra";
import { IQueryParams } from "@/types";
import { Prisma } from "@prisma/client";
export const Create = async (data: Prisma.MitraCreateInput) => {
	return await prisma.mitra.create({
		data,
	});
};

export const Get = async (query: IQueryParams) => {
	const { search = "" } = query;
	const parsed = SchemaQueryParams.parse(query);
	const trimmedSearch = search.trim();

	const page = Number(parsed.page) > 0 ? Number(parsed.page) : 1;
	const perPage = Number(parsed.perPage) > 0 ? Number(parsed.perPage) : 10;

	return await prisma.mitra.findMany({
		select: {
			id: true,
			nama: true,
			kode_mitra: true,
			alamat: true,
			telepon: true,
		},
		where: {
			OR: [
				{ nama: { contains: trimmedSearch, mode: "insensitive" } },
				{ alamat: { contains: trimmedSearch, mode: "insensitive" } },
				{ kode_mitra: { contains: trimmedSearch, mode: "insensitive" } },
			],
		},
		skip: (page - 1) * perPage,
		take: perPage,
	});
};
export const count = async () => await prisma.mitra.count();

export const getByName = async (nama: string) => {
	return await prisma.mitra.findFirst({
		where: { nama },
	});
};
export const Delete = async (id: string) => {
	return await prisma.mitra.delete({
		where: { id },
	});
};
export const GetById = async (id: string) => {
	return await prisma.mitra.findUnique({
		where: { id },
	});
};
export const GetKodeMitra = async (kode: string) => {
	return await prisma.mitra.findUnique({
		where: { kode_mitra: kode },
	});
};
export const Update = async (id: string, body: IzMasterMitra) => {
	return await prisma.mitra.update({
		where: { id },
		data: body,
	});
};
