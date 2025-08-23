"use client";
import { IzMasterInventory } from "@/schema";
import React from "react";
import DataTable from "../../molecules/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useBlanjaStore } from "@/stores/useBlanjaStore";

type Props = {
	data: IzMasterInventory[];
	isLoading: boolean;
};

export default function TablelBlanjaMitra({ data, isLoading }: Props) {
	const { addItem } = useBlanjaStore();

	return (
		<DataTable
			isLoading={!isLoading}
			sourceData={data}
			columns={[
				{
					name: "no",
					indexData: "no",
					render: (_, i = 0) => 1 + i,
				},
				{
					name: "Name",
					indexData: "name",
				},
				{
					name: "Stock",
					indexData: "stock",
				},
				{
					name: "Harga jual",
					indexData: "harga_jual",
				},
				{
					name: "Aksi",
					indexData: "Aksi",
					render: (_, I, items) => {
						return (
							<Button
								asChild
								className="cursor-pointer"
								size={"icon"}
								onClick={() => addItem(items)}
							>
								<Plus />
							</Button>
						);
					},
				},
			]}
		/>
	);
}
