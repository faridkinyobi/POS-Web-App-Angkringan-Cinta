import { handleApiError } from "@/lib/errors/handler-error";
import { NextRequest, NextResponse } from "next/server";
// import { AuthSchema } from "@/lib/zodSchema"; // Import the schema, not the type
// import { validateRequest } from "@/lib/errors/validateRequest";
import authServices from "./authServices";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const result = await authServices(body);

		return NextResponse.json({ data: result }, { status: 200 });
	} catch (error) {
		return handleApiError(error as Error);
	}
}
