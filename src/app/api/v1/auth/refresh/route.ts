import { handleApiError } from "@/lib/errors/handler-error";
import { NextResponse } from "next/server";

import { refreshTokenServices } from "./refrashtokenServices";
import { cookies } from "next/headers";
// import { ERROR_CODE } from "@/types";

export async function POST() {
	try {
		const cookieStore = cookies();
		const oldRefreshToken = (await cookieStore).get("refresh_token")?.value;

		if (!oldRefreshToken) return null;

		console.log(oldRefreshToken, "old");
		const result = await refreshTokenServices(oldRefreshToken);

		return NextResponse.json(
			{ message: "Refresh token success", data: result.accessToken },
			{ status: 200 }
		);
	} catch (error) {
		return handleApiError(error as Error);
	}
}
