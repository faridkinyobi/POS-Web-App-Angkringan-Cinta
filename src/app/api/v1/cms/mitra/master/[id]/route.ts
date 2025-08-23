import { NextRequest, NextResponse } from "next/server";

import * as useServices from "../masterServices";
import { verifyTokenSessionServer } from "@/app/api/v1/auth/dal";
import { handleApiError } from "@/lib/errors";
import { SchemaMasterMitra } from "@/schema";
import { validateRequest } from "@/lib/errors/validateRequest";
import { revalidateTag, unstable_cache } from "next/cache";

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = await params;

		await verifyTokenSessionServer();

		await useServices.Delet(id);

		// Hapus / invalidasi cache
		await revalidateTag("master-mitra-cache");

		return NextResponse.json(
			{ message: "Deleted successfully" },
			{
				status: 200,
			}
		);
	} catch (error) {
		return handleApiError(error as Error);
	}
}
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = await params;
		await verifyTokenSessionServer();

		const data = await getMasterMitraByIdCached(id);
		// const data = await useServices.GetById(id);

		return NextResponse.json(data, {
			status: 200,
		});
	} catch (error) {
		return handleApiError(error as Error);
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = await params;
		const body = await req.json();

		await verifyTokenSessionServer();

		await validateRequest(SchemaMasterMitra, body);

		await useServices.Update(id, body);

		await revalidateTag("master-mitra-cache");

		return NextResponse.json(
			{
				message: "Updated successfully",
			},
			{ status: 200 }
		);
	} catch (error) {
		return handleApiError(error as Error);
	}
}

const getMasterMitraByIdCached = (id: string) =>
	unstable_cache(
		async () => {
			// console.log(`🚀 Ambil dari DB untuk ID ${id}, belum cache`);
			return await useServices.GetById(id);
		},
		["master-mitra-cache", id], // cache key unik per id
		{ revalidate: 1000, tags: ["master-mitra-cache"] }
	)();
