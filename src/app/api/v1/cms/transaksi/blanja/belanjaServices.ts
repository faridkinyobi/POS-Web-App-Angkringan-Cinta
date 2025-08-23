import * as useRepository from "./belanjaRepository";
import { IQueryParams } from "@/types";


export const GetAll = async (query: IQueryParams) => {
    const { perPage = "10", page = "1" } = query;

    const [data, total] = await Promise.all([
        await useRepository.Get(query),
        await useRepository.count(),
    ]);
    console.log(data, 'data');
    return { data, total, page, perPage };
};

// export const Delet = async (id: string) => {
//     if (!id) {
//         throw new AppError(ERROR_CODE.BAD_REQUEST.code, "ID is required");
//     }
//     const checkData = await useRepository.GetById(id);
//     if (!checkData) {
//         throw new AppError(ERROR_CODE.NOT_FOUND.code, "Data not found");
//     }

//     const result = await useRepository.Delete(id);

//     if (!result) {
//         throw new AppError(
//             ERROR_CODE.INTERNAL_SERVER_ERROR.code,
//             "Delet master inventory failed"
//         );
//     }
//     return result;
// };

// export const Update = async (id: string, body: IzMasterMitra) => {
//     if (!id) {
//         throw new AppError(ERROR_CODE.BAD_REQUEST.code, "ID is required");
//     }
//     const checkData = await useRepository.GetById(id);

//     if (!checkData) {
//         throw new AppError(ERROR_CODE.NOT_FOUND.code, "Data not found");
//     }

//     const result = await useRepository.Update(id, body);

//     if (!result) {
//         throw new AppError(
//             ERROR_CODE.INTERNAL_SERVER_ERROR.code,
//             "Delet master inventory failed"
//         );
//     }
//     return result;
// };

// export const GetById = async (id: string) => {
//     if (!id) {
//         throw new AppError(ERROR_CODE.BAD_REQUEST.code, "ID is required");
//     }
//     const result = await useRepository.GetById(id);

//     if (!result) {
//         throw new AppError(
//             ERROR_CODE.INTERNAL_SERVER_ERROR.code,
//             "data master inventory failed"
//         );
//     }
//     return result;
// };
