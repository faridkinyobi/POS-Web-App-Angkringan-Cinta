import { IQueryParams } from "@/types";

export function parseQueryParams(query: URLSearchParams): IQueryParams {
	const {
		search = "",
		perPage = "10",
		page = " 1",
	} = Object.fromEntries(query);
	return {
		search,
		perPage,
		page,
	};
}
