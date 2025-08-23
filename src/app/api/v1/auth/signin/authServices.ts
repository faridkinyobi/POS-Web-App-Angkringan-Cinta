import { validateRequest } from "@/lib/errors/validateRequest";
import { AuthSchema, IzLoginInput } from "@/schema";
import * as useRepository from "./authRepository";
import { AppError } from "@/lib/errors";
import { ERROR_CODE } from "@/types";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "@/utils/JwtToken";
import { createSession } from "@/lib/session";
import * as useRefrashToken from "../refresh/refrashtokenRepository";
import { autsigninhMapper } from "./authMapper";

export default async function LoginService(body: IzLoginInput) {
	await validateRequest(AuthSchema, body);

	const checkEmail = await useRepository.getUserByEmail(body.email);
	if (!checkEmail) {
		throw new AppError(ERROR_CODE.NOT_FOUND.code, "Email not found");
	}

	const verifyPassword = await bcrypt.compare(
		body.password,
		checkEmail.password
	);
	if (!verifyPassword) {
		throw new AppError(ERROR_CODE.UNAUTHORIZED.code, "Invalid Credentials");
	}

	const payload = {
		id: checkEmail.id,
		name: checkEmail.name,
		email: checkEmail.email,
		role: checkEmail.role,
	};
	const accessToken = await generateAccessToken(payload);
	const refreshToken = await generateRefreshToken(payload);

	const payloadSession = {
		user: {
			connect: { id: checkEmail.id },
		},
		token: refreshToken,
		isRevoked: false,
		expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
	};

	// create refrase token data to base session
	await useRefrashToken.creatRefrashtoken(payloadSession);

	// Creat cookies Session
	await createSession(accessToken, refreshToken);

	return autsigninhMapper(payload);
}
