import AxiosInstance from "@/lib/axios";
import { IQueryParams } from "@/types";

export const fetchMasterMitra = async ({
	search = "",
	perPage = "10",
	page = "1",
}: IQueryParams) => {
	console.log("🚀 fetchMasterInventory dipanggil master");
	return await AxiosInstance.get("/cms/mitra/master", {
		params: {
			search,
			perPage,
			page,
		},
	});
};

export const fetchMasterMitraId = async (slug: string) => {
	console.log("🚀 fetchMasterInventory dipanggil");
	return await AxiosInstance.get(`/cms/mitra/master/${slug}`);
};
