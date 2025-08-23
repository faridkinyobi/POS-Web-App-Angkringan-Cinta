import AxiosInstance from "@/lib/axios";
import { IQueryParams } from "@/types";

export const fetchTransaksi = async ({
    search = "",
    perPage = "10",
    page = "1",
    endDate,
    startDate,
}: IQueryParams) => {
    const params: Record<string, string> = {
        search,
        perPage,
        page,
    };

    // hanya tambahkan kalau ada value
    if (startDate) params.startDate = new Date(startDate).toISOString();
    if (endDate) params.endDate = new Date(endDate).toISOString();

    return await AxiosInstance.get("/cms/transaksi/blanja", { params });
};
