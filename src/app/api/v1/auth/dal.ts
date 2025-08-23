import { AppError } from "@/lib/errors";
import { ERROR_CODE } from "@/types";
import { verifyAccessToken } from "@/utils/JwtToken";

import { cookies } from "next/headers";
import { cache } from "react"; // opsional

export const verifyTokenSessionServer = cache(async () => {
	const token = (await cookies())?.get("access_token")?.value;
	try {
		if (!token) {
			throw new AppError(
				ERROR_CODE.UNAUTHORIZED.code,
				"Authentication invalid"
			);
		}
		const decoded = verifyAccessToken(token);

		if (typeof decoded === "string" || !decoded.id) return null;
		const payload = {
			id: decoded.id,
			name: decoded.name,
			email: decoded.email,
			role: decoded.role,
		};
		return { payload };
	} catch (error) {
		throw error;
	}
});
