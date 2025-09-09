import { prisma } from "@/lib/prisma";
import { IzMasterInventory, SchemaQueryParams } from "@/schema";
import { IQueryParams } from "@/types";
import { Prisma } from "@prisma/client";

export const Create = async (data: Prisma.MasterInventoryCreateInput) => {
	const stockDecimal = new Prisma.Decimal(Number(data.stock));
	const hargaBeli = new Prisma.Decimal(Number(data.harga_beli));
	const hargaJual = new Prisma.Decimal(Number(data.harga_jual));

	return await prisma.masterInventory.create({
		data: {
			kode_barang: data.kode_barang,
			name: data.name,
			stock: data.stock,
			satuan: data.satuan,
			katagory: data.katagory,
			harga_beli: data.harga_beli,
			harga_jual: data.harga_jual,
			LaporanInventory: {
				create: {
					stock_awal: 0,
					stock_masuk: data.stock,
					stock_keluar: 0,
					stock_akhir: data.stock,
					status: "INIT",
					nilai_pembelian: stockDecimal.mul(hargaBeli),
					nilai_penjualan: stockDecimal.mul(hargaJual),
					laba: stockDecimal.mul(hargaJual).minus(stockDecimal.mul(hargaBeli)),
				}
			}
		}
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
			kode_barang: true,
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
		orderBy: {
			createdAt: 'asc'
		},
		skip: (Number(parsed.page) - 1) * Number(parsed.perPage),
		take: Number(parsed.perPage),
	});
};
export const count = async () => await prisma.masterInventory.count();

export const getBykeyword = async (keyword: string) => {
	return await prisma.masterInventory.findFirst({
		where: {
			OR: [
				{ name: { equals: keyword, mode: "insensitive" } },
				{ kode_barang: { equals: keyword, mode: "insensitive" } }
			]
		},
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
