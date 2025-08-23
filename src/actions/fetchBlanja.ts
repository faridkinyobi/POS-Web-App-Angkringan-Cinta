import AxiosInstance from "@/lib/axios";
import { IQueryParams } from "@/types";

export const fetchBlanjaInventory = async ({
	search = "",
	perPage = "10",
	page = "1",
}: IQueryParams) => {
	return await AxiosInstance.get("/cms/inventory/master", {
		params: {
			search,
			perPage,
			page,
		},
	});
};

export const fetchBlanjaInventoryId = async (slug: string) => {
	return await AxiosInstance.get(`/cms/inventory/master/${slug}`);
};
export const fetchByKodeMitra = async (code: string) => {
	return await AxiosInstance.get(`/cms/mitra/blanja/${code}`);
};
