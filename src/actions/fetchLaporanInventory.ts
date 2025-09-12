import AxiosInstance from "@/lib/axios";
import { IQueryParams } from "@/types";

export const fetchLaporanInventory = async ({
	search = "",
	perPage = "10",
	page = "1",
	startDate,
	endDate
}: IQueryParams) => {
	return await AxiosInstance.get("/cms/laporan/inventory", {
		params: {
			search,
			perPage,
			page,
			startDate,
			endDate
		},
	});
};

export const fetchLaporanInventoryId = async (slug: string) => {
	return await AxiosInstance.get(`/cms/laporan/inventory/${slug}`);
};
