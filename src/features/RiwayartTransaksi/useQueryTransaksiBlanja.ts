"use client";
import { fetchTransaksi, fetchTransaksiById } from "@/actions";
import AxiosInstance from "@/lib/axios";
import { handleOnError } from "@/lib/errors/handleOnError";
import { IzAmountPaid } from "@/schema";
import { useQueryParamStore } from "@/stores";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";

export const useGetTransaksiBlanja = () => {
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

export const useUpdateStatusTransaksiBlanja = () => {
    // const router = useRouter();
    const { refetch } = useGetTransaksiBlanja();

    return useMutation({
        mutationFn: async (data: IzAmountPaid) => {

            const result = await AxiosInstance.put(`/cms/transaksi/blanja/${data.id}`, { amount_paid: data.amount_paid });
            return result.data;
        },
        onSuccess() {
            toast.success("updated  successfully");
            // fetch ulang TanStack Query
            refetch();
        },
        onError(err) {
            const { status, message } = handleOnError(err);

            if (status === 409) {
                toast.error(" data already exists");
            } else {

                toast.error(message || "Failed to update transaksi");
            }
        },
    });
};

export const useGetBayIdTransaksi = (id: string) => {
    return useQuery({
        queryKey: ["mitra-blanja-cache", id],
        queryFn: async () => {
            const result = await fetchTransaksiById(id);
            return result.data;
        },
        enabled: !!id,
    });
};
