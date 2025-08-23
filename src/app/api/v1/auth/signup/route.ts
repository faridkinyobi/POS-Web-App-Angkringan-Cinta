import { handleApiError } from "@/lib/errors";
import { NextRequest, NextResponse } from "next/server";

import { singnupUserServices } from "./signupServices";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		await singnupUserServices(body);

		return NextResponse.json({ message: "success" }, { status: 200 });
	} catch (error) {
		return handleApiError(error as Error);
	}
}
