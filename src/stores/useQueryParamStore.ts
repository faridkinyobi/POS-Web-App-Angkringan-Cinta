import { IQueryParamsStore } from "@/types";
import { create } from "zustand";

export const useQueryParamStore = create<IQueryParamsStore>((set) => ({
	search: "",
	page: "1",
	perPage: "10",
	endDate: "",
	startDate: "",
	setQueryParamsStore(param) {
		set((state) => ({ ...state, ...param }));
	},
}));
