import "server-only";
import { cookies } from "next/headers";
import { config } from "@/config";

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

const ACCESS_TOKEN_EXPIRES_IN_MINUTES = 100;
const REFRESH_TOKEN_EXPIRES_IN_DAYS = 7;

export async function createSession(accessToken: string, refreshToken: string) {
	const cookieStore = await cookies();

	const accessTokenExpiresAt = new Date(
		Date.now() + ACCESS_TOKEN_EXPIRES_IN_MINUTES * 60 * 1000 //15m
	);
	const refreshTokenExpiresAt = new Date(
		Date.now() + REFRESH_TOKEN_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000 //7day
	);

	cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
		httpOnly: true,
		secure: config.nodeEnv === "production",
		expires: accessTokenExpiresAt,
		sameSite: "lax",
		path: "/",
	});

	cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
		httpOnly: true,
		secure: config.nodeEnv === "production",
		expires: refreshTokenExpiresAt,
		sameSite: "lax",
		path: "/",
	});
}

export async function getSessionTokens(): Promise<{
	accessToken: string | null;
	refreshToken: string | null;
}> {
	const cookieStore = await cookies();
	return {
		accessToken: cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null,
		refreshToken: cookieStore.get(REFRESH_TOKEN_COOKIE)?.value ?? null,
	};
}

export async function deleteSession() {
	const cookieStore = await cookies();
	cookieStore.delete("access_token");
	cookieStore.delete("refresh_token");
}
