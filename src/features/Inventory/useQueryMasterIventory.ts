import { fetchMasterInventory, fetchMasterInventoryId } from "@/actions";
import AxiosInstance from "@/lib/axios";
// import { invalidateQuery } from "@/lib/invalidateQuery";
import { IzMasterInventory } from "@/schema";
import { useQueryParamStore } from "@/stores";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import { handleOnError } from "@/lib/errors/handleOnError";

export const useGetMasterInventory = () => {
	const { search, perPage, page } = useQueryParamStore();
	const [debouncedSearch] = useDebounce(search, 700);

	return useQuery({
		queryKey: [
			"master-inventory-cache",
			{ search: debouncedSearch, perPage, page },
		],
		queryFn: async () => {
			const result = await fetchMasterInventory({
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
export const useGetByIdMasterInventory = (id: string) => {
	return useQuery({
		queryKey: ["master-inventory-cache", id],
		queryFn: async () => {
			const result = await fetchMasterInventoryId(id);
			return result.data;
		},
		enabled: !!id,
	});
};

// ---------
// ADD DATA
// ---------
export const useAddMasterInventory = () => {
	const router = useRouter();
	const { refetch } = useGetMasterInventory();
	return useMutation({
		mutationFn: async (payload: IzMasterInventory) => {
			const result = await AxiosInstance.post("/cms/inventory/master", payload);
			return result.data;
		},
		onSuccess() {
			// fetch ulang TanStack Query
			refetch();
			toast.success("creat data successfully");
			//  Redirect
			router.push("/dashboard/master-inventory");
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

// ---------
// DELET DATA
// ---------
export const useDeletMasterInventory = () => {
	const { refetch } = useGetMasterInventory();
	return useMutation({
		mutationFn: async (id: string) => {
			const result = await AxiosInstance.delete(`/cms/inventory/master/${id}`);
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

// ---------
// EDIT DATA
// ---------
export const useEditMasterInventory = () => {
	const router = useRouter();
	const { refetch } = useGetMasterInventory();
	return useMutation({
		mutationFn: async ({
			id,
			data,
		}: {
			id: string;
			data: IzMasterInventory;
		}) => {
			const result = await AxiosInstance.put(
				`/cms/inventory/master/${id}`,
				data
			);
			return result.data;
		},
		onSuccess() {
			// fetch ulang TanStack Query
			refetch();

			toast.success("Inventory updated successfully");

			//  Redirect
			router.push("/dashboard/master-inventory");
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
