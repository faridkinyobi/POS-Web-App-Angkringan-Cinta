import { handleApiError } from "@/lib/errors";
import { NextRequest, NextResponse } from "next/server";

import * as useServices from "./belanjaServices";
import { verifyTokenSessionServer } from "@/app/api/v1/auth/dal";
import { parseQueryParams } from "@/lib/parseQueryParams";
import { unstable_cache } from "next/cache";
import { IQueryParams } from "@/types";

export async function GET(req: NextRequest) {
    try {
        await verifyTokenSessionServer();

        const query = parseQueryParams(req?.nextUrl?.searchParams);


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
        ["mitra-blanja-cache", JSON.stringify(query)],
        { revalidate: 300, tags: ["mitra-blanja-cache"] } //4m
    )();
};
