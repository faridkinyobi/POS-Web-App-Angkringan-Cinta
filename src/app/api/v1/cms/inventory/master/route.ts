import { handleApiError } from "@/lib/errors";
import { NextRequest, NextResponse } from "next/server";

import * as useServices from "./masterServices";
import { verifyTokenSessionServer } from "@/app/api/v1/auth/dal";
import { parseQueryParams } from "@/lib/parseQueryParams";
import { validateRequest } from "@/lib/errors/validateRequest";
import { SchemaMasterInventory } from "@/schema";
import { revalidateTag, unstable_cache } from "next/cache";
import { IQueryParams } from "@/types";

export async function POST(req: NextRequest) {
	try {
		await verifyTokenSessionServer();

		const body = await req.json();

		await validateRequest(SchemaMasterInventory, body);

		await useServices.Creat(body);
		// Hapus / invalidasi cache
		await revalidateTag("master-inventory-cache");

		return NextResponse.json({ message: "success" }, { status: 200 });
	} catch (error) {
		return handleApiError(error as Error);
	}
}

export async function GET(req: NextRequest) {
	try {
		await verifyTokenSessionServer();

		const query = parseQueryParams(req?.nextUrl?.searchParams);

		// const data = await useServices.GetAll(query);
		const data = await getMasterInventoryCached(query);

		return NextResponse.json(
			{
				data,
			},
			{ status: 200 }
		);
	} catch (error) {
		return handleApiError(error as Error);
	}
}

const getMasterInventoryCached = (query: IQueryParams) => {
	return unstable_cache(
		async () => {
			// console.log("🚀 Ambil dari DB, belum cache");
			return await useServices.GetAll(query);
		},
		["master-inventory-cache", JSON.stringify(query)],
		{ revalidate: 300, tags: ["master-inventory-cache"] } //4m
	)();
};
