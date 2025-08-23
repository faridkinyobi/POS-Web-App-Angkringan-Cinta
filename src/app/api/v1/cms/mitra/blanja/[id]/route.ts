import { NextRequest, NextResponse } from "next/server";

import * as useServices from "../belanjaServices";
import { verifyTokenSessionServer } from "@/app/api/v1/auth/dal";
import { handleApiError } from "@/lib/errors";

import { unstable_cache } from "next/cache";

// export async function DELETE(
// 	req: NextRequest,
// 	{ params }: { params: { id: string } }
// ) {
// 	try {
// 		const { id } = await params;

// 		await verifyTokenSessionServer();

// 		await useServices.Delet(id);

// 		// Hapus / invalidasi cache
// 		await revalidateTag("master-mitra-cache");

// 		return NextResponse.json(
// 			{ message: "Deleted successfully" },
// 			{
// 				status: 200,
// 			}
// 		);
// 	} catch (error) {
// 		return handleApiError(error as Error);
// 	}
// }
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = await params;

		await verifyTokenSessionServer();

		const data = await getBlanjaByKodeMitraCached(id);
		// const data = await useServices.GetById(id);

		return NextResponse.json(data, {
			status: 200,
		});
	} catch (error) {
		return handleApiError(error as Error);
	}
}


const getBlanjaByKodeMitraCached = (id: string) =>
	unstable_cache(
		async () => {
			return await useServices.GetByKodeCode(id);
		},
		["master-mitra-cache", id], // cache key unik per id
		{ revalidate: 1000, tags: ["master-mitra-cache"] }
	)();
