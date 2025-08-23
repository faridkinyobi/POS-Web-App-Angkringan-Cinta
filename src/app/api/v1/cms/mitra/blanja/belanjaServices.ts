import { IzBlanjaMitra } from "@/schema";

import * as useRepository from './belanjaRepository'

import { AppError } from "@/lib/errors";
import { ERROR_CODE, } from "@/types";

export const Creat = async (body: IzBlanjaMitra, id: string) => {
    const grand_total = body.DetailMitraBelanja.reduce((acc, item) => acc + item.harga * item.qty, 0);
    const amount_paid = body.amount_paid;
    const refund = amount_paid - grand_total;

    const payload: IzBlanjaMitra = {
        ...body,
        user_id: id,
        grand_total,
        amount_paid,
        refund,
    }
    console.log(payload)
    const result = await useRepository.Create(payload);
    console.log(result, 'result')
    if (!result) {
        throw new AppError(
            ERROR_CODE.INTERNAL_SERVER_ERROR.code,
            "Creat master inventory failed"
        );
    }
    return result;
};

export const GetByKodeCode = async (id: string) => {
    if (!id) {
        throw new AppError(ERROR_CODE.BAD_REQUEST.code, "ID is required");
    }
    const result = await useRepository.getByKodeMitra(id);

    if (!result) {
        throw new AppError(
            ERROR_CODE.INTERNAL_SERVER_ERROR.code,
            "data mitra failed"
        );
    }
    return result;
};
