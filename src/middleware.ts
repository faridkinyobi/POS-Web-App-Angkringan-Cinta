import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/pos-angkringan-cinta"];
const PROTECTED_PATHS = ["/dashboard", "/api/v1/cms"];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const isPublicRoute = PUBLIC_PATHS.some((path) => pathname === path);

	const isProtectedRoute = PROTECTED_PATHS.some((path) =>
		pathname.startsWith(path)
	);
	// ssr
	const token = request.cookies.get("access_token")?.value;

	// protect belum login
	if (isProtectedRoute && !token) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (isPublicRoute && token) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}
	if (pathname.startsWith("/api/v1/cms") && !token) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
}

export const config = {
	matcher: ["/", "/dashboard/:path*", "/api/v1/cms/:path*"],
};
//  "/dashboard/:path*", "/api/v1/cms/:path*"
