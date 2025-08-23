import { handleApiError } from "@/lib/errors";
import { NextRequest, NextResponse } from "next/server";
import * as useServices from "./belanjaServices";
import { verifyTokenSessionServer } from "@/app/api/v1/auth/dal";
import { validateRequest } from "@/lib/errors/validateRequest";
import { SchemaBlanjaMitra } from "@/schema";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
    try {
        const user = await verifyTokenSessionServer();

        console.log(user)

        const body = await req.json();

        await validateRequest(SchemaBlanjaMitra, body);

        await useServices.Creat(body, user?.payload.id);
        // Hapus / invalidasi cache 
        await revalidateTag("mitra-blanja-cache");

        return NextResponse.json({ message: "success" }, { status: 200 });
    } catch (error) {
        return handleApiError(error as Error);
    }
}