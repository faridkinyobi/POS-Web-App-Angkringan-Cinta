
import { IzMasterMitra } from "@/schema";

import * as useRepository from "./masterRepository";
import { AppError } from "@/lib/errors";
import { ERROR_CODE, IQueryParams } from "@/types";

export const Creat = async (body: IzMasterMitra) => {

	const checkName = await useRepository.getByName(body.nama);
	if (checkName)
		throw new AppError(
			ERROR_CODE.ALREADY_EXISTS.code,
			"Resource already exists"
		);

	const result = await useRepository.Create(body);
	if (!result) {
		throw new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			"Creat master inventory failed"
		);
	}
	return result;
};

export const GetAll = async (query: IQueryParams) => {
	const { perPage = "10", page = "1" } = query;

	const [data, total] = await Promise.all([
		await useRepository.Get(query),
		await useRepository.count(),
	]);
	// console.log(data);
	return { data, total, page, perPage };
};

export const Delet = async (id: string) => {
	if (!id) {
		throw new AppError(ERROR_CODE.BAD_REQUEST.code, "ID is required");
	}
	const checkData = await useRepository.GetById(id);
	if (!checkData) {
		throw new AppError(ERROR_CODE.NOT_FOUND.code, "Data not found");
	}

	const result = await useRepository.Delete(id);

	if (!result) {
		throw new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			"Delet master inventory failed"
		);
	}
	return result;
};

export const Update = async (id: string, body: IzMasterMitra) => {
	if (!id) {
		throw new AppError(ERROR_CODE.BAD_REQUEST.code, "ID is required");
	}
	const checkData = await useRepository.GetById(id);

	if (!checkData) {
		throw new AppError(ERROR_CODE.NOT_FOUND.code, "Data not found");
	}

	const result = await useRepository.Update(id, body);

	if (!result) {
		throw new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			"Delet master inventory failed"
		);
	}
	return result;
};

export const GetById = async (id: string) => {
	if (!id) {
		throw new AppError(ERROR_CODE.BAD_REQUEST.code, "ID is required");
	}
	const result = await useRepository.GetById(id);

	if (!result) {
		throw new AppError(
			ERROR_CODE.INTERNAL_SERVER_ERROR.code,
			"data master inventory failed"
		);
	}
	return result;
};
