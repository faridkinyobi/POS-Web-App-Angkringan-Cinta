import { handleApiError } from "@/lib/errors";
import { parseQueryParams } from "@/lib/parseQueryParams";
import { NextRequest, NextResponse } from "next/server";
import { verifyTokenSessionServer } from "../../../auth/dal";
import { revalidateTag, unstable_cache } from "next/cache";
import * as  useServices from './laporanServices'
import { IQueryParams } from "@/types";

export async function GET(req: NextRequest) {
    try {
        await verifyTokenSessionServer();

        const query = parseQueryParams(req?.nextUrl?.searchParams);
        const data = await getLaporanInventoryCached(query);

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
const getLaporanInventoryCached = (query: IQueryParams) => {
    return unstable_cache(
        async () => {
            return await useServices.GetAll(query);
        },
        ["laporan-blanja-cache", JSON.stringify(query)],
        { revalidate: 300, tags: ["laporan-blanja-cache"] } //4m
    )();
};



export async function POST(req: NextRequest) {
    try {
        await verifyTokenSessionServer();

        const body = await req.json();

        await revalidateTag("master-inventory-cache");
        await revalidateTag("laporan-blanja-cache");

        await useServices.CreatData(body)

        return NextResponse.json({ message: "success" }, { status: 200 });
    } catch (error) {
        return handleApiError(error as Error);
    }
}


