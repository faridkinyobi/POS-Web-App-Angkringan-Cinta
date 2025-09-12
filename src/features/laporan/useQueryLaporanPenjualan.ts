"use client";
import { fetchLaporanPenjualan } from "@/actions";
import { useQueryParamStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

export const useGetLaporanPenjualan = () => {
    const { search, perPage, page, startDate, endDate } = useQueryParamStore();
    const [debouncedSearch] = useDebounce(search, 700);

    return useQuery({
        queryKey: [
            "laporan-penjualan-cache",
            { search: debouncedSearch, perPage, page, startDate, endDate },
        ],
        queryFn: async () => {
            const result = await fetchLaporanPenjualan({
                search: debouncedSearch,
                perPage,
                page,
                startDate,
                endDate
            });

            return result.data;
        },
    });
};
