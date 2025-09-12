import { ERROR_CODE, IQueryParams } from "@/types";
import *as useRepository from "./laporanRepository"
import { validateRequest } from "@/lib/errors/validateRequest";
import { IzInOutInventory, SchemaLaporanInventory } from "@/schema";
import { AppError } from "@/lib/errors";
import { Prisma } from "@prisma/client";
export const GetAll = async (query: IQueryParams) => {
    const { perPage = "10", page = "1" } = query;

    const [data, total] = await Promise.all([
        await useRepository.Get(query),
        await useRepository.count(),
    ]);
    return { data, total, page, perPage };
};

export const CreatData = async (body: IzInOutInventory) => {

    const checkInventory = await useRepository.getByIdInventoy(body.id)

    if (body.qty <= 0) {
        throw new AppError(ERROR_CODE.BAD_REQUEST.code, "Stock in must be greater than 0");
    }

    if (!checkInventory) {
        throw new AppError(ERROR_CODE.NOT_FOUND.code, 'inventory not found')
    }

    if (body.status === 'OUT' && checkInventory.stock < body.qty) {
        throw new AppError(ERROR_CODE.BAD_REQUEST.code, 'Stock is insufficient')
    }

    const laporan = await useRepository.getByIdlaporan(body.id)

    // Decimal untuk perhitungan harga
    const stockDecimal = new Prisma.Decimal(body.qty);
    const hargaBeli = new Prisma.Decimal(checkInventory.harga_beli);
    const hargaJual = new Prisma.Decimal(checkInventory.harga_jual);

    const stock_akhir = body?.status === "IN" ? (laporan?.stock_akhir ?? 0) + body.qty : (laporan?.stock_akhir ?? 0) - body.qty;

    const payload = {
        stock_awal: Number(laporan?.stock_akhir),
        stock_masuk: body.status === "IN" ? body.qty : 0,
        stock_keluar: body.status === "OUT" ? body.qty : 0,
        stock_akhir: Number(stock_akhir),
        status: body.status,
        nilai_pembelian: Number(stockDecimal.mul(hargaBeli)),
        nilai_penjualan: Number(stockDecimal.mul(hargaJual)),
        laba: Number(stockDecimal.mul(hargaJual).minus(stockDecimal.mul(hargaBeli))),
        masterInventory: {
            connect: { id: body.id }
        }
    }


    await validateRequest(SchemaLaporanInventory, payload);
    const result = await useRepository.creat(payload)

    await useRepository.updateMasterInventory(body.id, stock_akhir)

    return result
}