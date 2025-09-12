import AxiosInstance from "@/lib/axios";
import { IQueryParams } from "@/types";

export const fetchLaporanPenjualan = async ({
	search = "",
	perPage = "10",
	page = "1",
	startDate,
	endDate
}: IQueryParams) => {
	return await AxiosInstance.get("/cms/laporan/penjualan", {
		params: {
			search,
			perPage,
			page,
			startDate,
			endDate
		},
	});
};

export const fetchLaporanPenjualanId = async (slug: string) => {
	return await AxiosInstance.get(`/cms/laporan/penjualan/${slug}`);
};
