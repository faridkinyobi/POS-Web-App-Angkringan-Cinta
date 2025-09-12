"use client";
import { fetchLaporanInventory } from "@/actions";
import { useQueryParamStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

export const useGetLaporanInventory = () => {
    const { search, perPage, page, startDate, endDate } = useQueryParamStore();
    const [debouncedSearch] = useDebounce(search, 700);

    return useQuery({
        queryKey: [
            "laporan-inventory-cache",
            { search: debouncedSearch, perPage, page, startDate, endDate },
        ],
        queryFn: async () => {
            const result = await fetchLaporanInventory({
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
