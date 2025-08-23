import { fetchBlanjaInventory, fetchByKodeMitra } from "@/actions";
import AxiosInstance from "@/lib/axios";
import { handleOnError } from "@/lib/errors/handleOnError";
import { IzBlanjaMitra } from "@/schema";
import { useQueryParamStore } from "@/stores";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";


export const useGetInventoryBlanja = () => {
	const { search, perPage, page } = useQueryParamStore();
	const [debouncedSearch] = useDebounce(search, 700);

	return useQuery({
		queryKey: [
			"master-inventory-cache",
			{ search: debouncedSearch, perPage, page },
		],
		queryFn: async () => {
			const result = await fetchBlanjaInventory({
				search: debouncedSearch,
				perPage,
				page,
			});

			return result.data;
		},
	});
};

export const useKodeMitra = (kode: string) => {
	const [debouncedkode] = useDebounce(kode, 700);

	return useQuery({
		queryKey: ["master-mitra-cache", debouncedkode],
		queryFn: async () => {
			const result = await fetchByKodeMitra(debouncedkode);
			return result.data;
		},
		enabled: !!kode,
	});
};

export const useAddBlanjaMitra = () => {
	// const router = useRouter();
	// const { refetch } = useGetMasterMitra();
	return useMutation({
		mutationFn: async (payload: IzBlanjaMitra) => {
			console.log(payload, 'payload')
			const result = await AxiosInstance.post("/cms/mitra/blanja", payload);
			return result.data;
		},
		onSuccess() {
			// fetch ulang TanStack Query
			// refetch();
			toast.success("creat data successfully");
			//  Redirect
			// router.push("/dashboard/master-mitra");
		},
		onError(err) {
			const { status, message } = handleOnError(err);

			if (status === 409) {
				toast.error("inventory data already exists");
			} else {
				toast.error(message || "Failed to create inventory");
			}
		},
	});
};