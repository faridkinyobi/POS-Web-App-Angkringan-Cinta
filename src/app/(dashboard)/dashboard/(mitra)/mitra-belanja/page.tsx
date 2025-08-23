"use client";

import TableFilter from "@/components/dashboard/atoms/TableFilter";
import {
	SheetBelanjaMitra,
	TablelBlanjaMitra,
} from "@/components/dashboard/organisms";
import { useGetInventoryBlanja } from "@/features";
import React from "react";

export default function Page() {
	const { data, isLoading } = useGetInventoryBlanja();

	return (
		<div className="flex flex-row justify-between gap-6">
			<div className="py-6 bg-background-secondary rounded-lg w-full flex-1 h-max">
				<div className="py-4 px-3 space-y-3 bg-background">
					<TableFilter />
				</div>
				<div className="p-3 w-full">
					<TablelBlanjaMitra data={data?.data.data} isLoading={isLoading} />
				</div>
			</div>
			<SheetBelanjaMitra />
			{/* <div className="p-4 w-[265px] sticky border-l bg-background-secondary rounded-lg gap-4 flex flex-col">
				<h3 className="md:text-3xl font-semibold">Card</h3>
				<div className="w-full">
					<BelanjaMitralist />
				</div>
				<CartSummary subTotal={1000} grandTotal={1000} discount={2000} />
			</div> */}
		</div>
	);
}
