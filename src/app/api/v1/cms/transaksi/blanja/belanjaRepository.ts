import { prisma } from "@/lib/prisma";
import { SchemaQueryParams } from "@/schema";

import { IzMasterMitra } from "@/schema/SchemaMasterMitra";
import { IQueryParams } from "@/types";

export const Get = async (query: IQueryParams) => {
	const { search = "" } = query;
	const parsed = SchemaQueryParams.parse(query);

	const trimmedSearch = search.trim();

	return await prisma.mitraBelanja.findMany({
		include: {
			DetailMitraBelanja: true
		},
		where: {
			AND: [
				parsed.startDate && parsed.endDate
					? {
						createdAt: {
							gte: new Date(parsed.startDate),
							lte: new Date(parsed.endDate),
						},
					}
					: {}, {
					OR: [
						{ order_code: { contains: trimmedSearch, mode: "insensitive" } },
						{ mitra: { nama: { contains: trimmedSearch, mode: "insensitive" } } },
						{ user: { name: { contains: trimmedSearch, mode: "insensitive" } } },
					],
				}
			]
		},
		skip: (Number(parsed.page) - 1) * Number(parsed.perPage),
		take: Number(parsed.perPage),
	});
};

export const count = async () => await prisma.mitraBelanja.count();

export const getByName = async (nama: string) => {
	return await prisma.mitra.findFirst({
		where: { nama },
	});
};
export const Delete = async (id: string) => {
	return await prisma.mitraBelanja.delete({
		where: { id },
	});
};

export const Update = async (id: string, body: IzMasterMitra) => {
	return await prisma.mitra.update({
		where: { id },
		data: body,
	});
};
