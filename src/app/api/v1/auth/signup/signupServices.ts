import { validateRequest } from "@/lib/errors/validateRequest";
import { IzRegisterInput, RegisterSchema } from "@/schema";

import bcrypt from "bcryptjs";
import * as useRepository from "./signupRepository";
import { AppError } from "@/lib/errors";
import { ERROR_CODE } from "@/types";

export const singnupUserServices = async (body: IzRegisterInput) => {
	await validateRequest(RegisterSchema, body);
	const checkEmail = await useRepository.getUserByEmail(body.email);
	if (checkEmail)
		throw new AppError(
			ERROR_CODE.ALREADY_EXISTS.code,
			"Resource already exists"
		);

	// hash password
	const hashPassword = await bcrypt.hash(body.password, 10);

	const newUser = {
		name: body.name,
		email: body.email,
		password: hashPassword,
		role: body.role as any,
	};
	const creatUser = await useRepository.createUser(newUser);
	// creat akun
	return creatUser;
};
