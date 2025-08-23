import {
	generateAccessToken,
	generateRefreshToken,
	verifyRefraseToken,
} from "@/utils/JwtToken";
import { AppError } from "@/lib/errors";
import * as useRefrashToken from "./refrashtokenRepository";
import { ERROR_CODE } from "@/types";
import { createSession } from "@/lib/session";

export async function refreshTokenServices(oldRefreshToken: string) {
	const decoded = verifyRefraseToken(oldRefreshToken);

	if (
		!decoded ||
		typeof decoded === "string" ||
		!("id" in decoded) ||
		!("email" in decoded)
	) {
		throw new AppError(ERROR_CODE.UNAUTHORIZED.code, "Invalid refresh token");
	}

	const checkSession =
		await useRefrashToken.getbyOldRefreshtoken(oldRefreshToken);

	if (!checkSession || checkSession.isRevoked) {
		throw new AppError(ERROR_CODE.UNAUTHORIZED.code, "Session expired");
	}

	// Revoke refresh token lama
	await useRefrashToken.updateRefreshtoken(oldRefreshToken);

	const payload = {
		id: decoded.id,
		name: decoded.name,
		email: decoded.email,
		role: decoded.role,
	};
	const newAccessToken = generateAccessToken(payload);
	const newRefreshToken = generateRefreshToken(payload);
	// creat session
	const payloadSession = {
		user: {
			connect: { id: decoded.id },
		},
		token: newRefreshToken,
		isRevoked: false,
		expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
	};
	await useRefrashToken.creatRefrashtoken(payloadSession);
	// update cookies session
	await createSession(newAccessToken, newRefreshToken);

	return {
		accessToken: newAccessToken,
		refreshToken: newRefreshToken,
	};
}
