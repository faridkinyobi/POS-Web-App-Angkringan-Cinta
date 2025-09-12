"use client";
import { fetchTransaksi } from "@/actions";
import { useQueryParamStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

export const useGetTransaksiMenu = () => {
    const { search, perPage, page, endDate, startDate } = useQueryParamStore();
    const [debouncedSearch] = useDebounce(search, 700);

    return useQuery({
        queryKey: [
            "mitra-blanja-cache",
            { search: debouncedSearch, perPage, page, endDate, startDate },
        ],
        queryFn: async () => {
            const result = await fetchTransaksi({
                search: debouncedSearch,
                perPage,
                page,
                endDate,
                startDate
            });

            return result.data;
        },
    });
};