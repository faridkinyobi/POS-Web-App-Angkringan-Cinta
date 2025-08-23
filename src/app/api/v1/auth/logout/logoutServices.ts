import { AppError } from "@/lib/errors";
import * as useRefrashToken from "../refresh/refrashtokenRepository";
import { ERROR_CODE } from "@/types";
import { deleteSession } from "@/lib/session";

export async function deletTokenServices(oldRefreshToken: string) {
	const checkSession =
		await useRefrashToken.getbyOldRefreshtoken(oldRefreshToken);

	if (!checkSession || checkSession.isRevoked) {
		throw new AppError(ERROR_CODE.NOT_FOUND.code, ERROR_CODE.NOT_FOUND.message);
	}
	await deleteSession();
	return await useRefrashToken.deleteRefreshtoken(checkSession.token);
}
