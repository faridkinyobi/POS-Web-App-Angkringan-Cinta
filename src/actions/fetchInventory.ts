import AxiosInstance from "@/lib/axios";
import { IQueryParams } from "@/types";

export const fetchMasterInventory = async ({
	search = "",
	perPage = "10",
	page = "1",
}: IQueryParams) => {
	console.log("🚀 fetchMasterInventory dipanggil");
	return await AxiosInstance.get("/cms/inventory/master", {
		params: {
			search,
			perPage,
			page,
		},
	});
};

export const fetchMasterInventoryId = async (slug: string) => {
	console.log("🚀 fetchMasterInventory dipanggil");
	return await AxiosInstance.get(`/cms/inventory/master/${slug}`);
};
