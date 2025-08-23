import AxiosInstance from "@/lib/axios";
import { IzMasterMitra } from "@/schema";
import { useQueryParamStore } from "@/stores";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import { handleOnError } from "@/lib/errors/handleOnError";
import { fetchMasterMitra, fetchMasterMitraId } from "@/actions/fetchMitra";

export const useGetMasterMitra = () => {
	const { search, perPage, page } = useQueryParamStore();
	const [debouncedSearch] = useDebounce(search, 700);

	return useQuery({
		queryKey: [
			"master-mitra-cache",
			{ search: debouncedSearch, perPage, page },
		],
		queryFn: async () => {
			const result = await fetchMasterMitra({
				search: debouncedSearch,
				perPage,
				page,
			});

			return result.data;
		},
	});
};

// -----------
// GET BY ID
// -----------
export const useGetByIdMasterMitra = (id: string) => {
	return useQuery({
		queryKey: ["master-mitra-cache", id],
		queryFn: async () => {
			const result = await fetchMasterMitraId(id);
			return result.data;
		},
		enabled: !!id,
	});
};

// ---------
// ADD DATA
// ---------
export const useAddMasterMitra = () => {
	const router = useRouter();
	const { refetch } = useGetMasterMitra();
	return useMutation({
		mutationFn: async (payload: IzMasterMitra) => {
			const result = await AxiosInstance.post("/cms/mitra/master", payload);
			return result.data;
		},
		onSuccess() {
			// fetch ulang TanStack Query
			refetch();
			toast.success("creat data successfully");
			//  Redirect
			router.push("/dashboard/master-mitra");
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

// -----------
// DELET
// -----------
export const useDeleteMasterMitra = () => {
	const { refetch } = useGetMasterMitra();
	return useMutation({
		mutationFn: async (id: string) => {
			const result = await AxiosInstance.delete(`/cms/mitra/master/${id}`);
			return result.data;
		},
		onSuccess() {
			// fetch ulang TanStack Query
			refetch();

			toast.success("delet data successfully");
		},

		onError(err) {
			const { status, message } = handleOnError(err);

			if (status === 404 || status === 400) {
				toast.error("Inventory data does not exist");
			} else {
				toast.error(message || "Failed to delete inventory");
			}
		},
	});
};

// -----------
// EDIT
// -----------
export const useEditMasterMitra = () => {
	const router = useRouter();
	const { refetch } = useGetMasterMitra();
	return useMutation({
		mutationFn: async ({ id, data }: { id: string; data: IzMasterMitra }) => {
			const result = await AxiosInstance.put(`/cms/mitra/master/${id}`, data);
			return result.data;
		},
		onSuccess() {
			// fetch ulang TanStack Query
			refetch();

			toast.success("Inventory updated successfully");

			//  Redirect
			router.push("/dashboard/master-mitra");
		},
		onError(err) {
			const { status, message } = handleOnError(err);

			if (status === 409) {
				toast.error("Inventory data already exists");
			} else {
				toast.error(message || "Failed to update inventory");
			}
		},
	});
};
