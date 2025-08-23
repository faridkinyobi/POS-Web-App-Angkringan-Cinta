import { verifyAccessToken } from "@/utils/JwtToken";
import { cookies } from "next/headers";
import { cache } from "react"; // opsional
import { AppError, handleApiError } from "./errors";

import { ERROR_CODE } from "@/types";

export const verifyTokenSession = cache(async () => {
	try {
		const cookie = (await cookies()).get("access_token")?.value;

		if (!cookie) {
			throw new AppError(ERROR_CODE.UNAUTHORIZED.code, "unauthorized");
		}

		const decoded = verifyAccessToken(cookie);
		// console.log(decoded, "decode");
		if (typeof decoded === "string" || !decoded.id) return null;
		return { id: decoded.id };
	} catch (error) {
		return handleApiError(error as Error);
	}
});
