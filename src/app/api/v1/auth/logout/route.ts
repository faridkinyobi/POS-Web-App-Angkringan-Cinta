import { NextResponse } from "next/server";

import { deletTokenServices } from "./logoutServices";
import { getSessionTokens } from "@/lib/session";
import { AppError } from "@/lib/errors";
import { ERROR_CODE } from "@/types";

export async function POST() {
	const token = (await getSessionTokens()).refreshToken;
	if (!token)
		throw new AppError(ERROR_CODE.UNAUTHORIZED.code, "No refresh token found");

	await deletTokenServices(token);

	return NextResponse.json(
		{ message: "Logged out successfully" },
		{ status: 200 }
	);
}
