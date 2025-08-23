import { Input } from "@/components/ui/input";
import { useQueryParamStore } from "@/stores";
import { Search } from "lucide-react";
import React from "react";
import { DataSelect } from "../molecules";

export default function TableFilter() {
	const { setQueryParamsStore, search, perPage } = useQueryParamStore();

	return (
		<div className="flex flex-wrap items-center gap-3">
			<DataSelect
				className="w-[97px] bg-background-secondary"
				placeholder="show"
				dataSelect={[
					{ items: "10", value: "10" },
					{ items: "20", value: "20" },
					{ items: "50", value: "50" },
					{ items: "100", value: "100" },
				]}
				value={perPage}
				onValueChange={(value) => setQueryParamsStore({ perPage: value })}
			/>
			<Input
				placeholder="Search"
				type="text"
				endIcon={<Search />}
				name="search"
				value={search}
				onChange={(e) => setQueryParamsStore({ search: e.target.value })}
			/>
		</div>
	);
}
