import { prisma } from '@/lib/prisma'
import { SchemaQueryParams } from '@/schema';
import { IQueryParams } from '@/types';
import { Prisma } from '@prisma/client';

export const Get = async (query: IQueryParams) => {
    const { search = "" } = query;
    const parsed = SchemaQueryParams.parse(query);

    const page = Number(parsed.page) > 0 ? Number(parsed.page) : 1;
    const perPage = Number(parsed.perPage) > 0 ? Number(parsed.perPage) : 10;

    const trimmedSearch = search.trim();

    // filter tanggal
    const dateFilter =
        parsed.startDate && parsed.endDate
            ? {
                createdAt: {
                    gte: new Date(parsed.startDate),
                    lte: new Date(parsed.endDate),
                },
            }
            : parsed.startDate
                ? { createdAt: { gte: new Date(parsed.startDate) } }
                : parsed.endDate
                    ? { createdAt: { lte: new Date(parsed.endDate) } }
                    : {};

    return await prisma.laporanInventory.findMany({
        include: {
            masterInventory: {
                select: {
                    name: true,
                    kode_barang: true,
                    harga_beli: true,
                    harga_jual: true
                }
            }
        },
        where: {
            AND: [
                dateFilter, {
                    OR: [
                        {
                            masterInventory: {
                                kode_barang: { contains: trimmedSearch, mode: "insensitive" },
                            },
                        },
                        {
                            masterInventory: {
                                name: { contains: trimmedSearch, mode: "insensitive" },
                            },
                        },
                    ],
                }
            ]
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (page - 1) * perPage,
        take: perPage,
    });
};

export const count = async () => await prisma.laporanInventory.count();


export const creat = async (data: Prisma.LaporanInventoryCreateInput) => {
    return await prisma.laporanInventory.create({
        data
    })
}
export const getByIdInventoy = async (id: string) => {
    return await prisma.masterInventory.findUnique({
        where: { id }
    })
}
export const getByIdlaporan = async (id: string) => {
    return await prisma.laporanInventory.findFirst({
        where: { masterInventoryId: id }, orderBy: { createdAt: "desc" }
    })
}
export const updateMasterInventory = async (id: string, stock: number) => {
    return await prisma.masterInventory.update({
        where: { id },
        data: { stock },
    })
}