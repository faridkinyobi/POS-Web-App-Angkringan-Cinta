"use client";
import { IzMasterInventory } from "@/schema";
import React, { useCallback } from "react";
import DataTable from "../../molecules/DataTable";
import ActionDropdown from "../../molecules/ActionDropdown";
import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useAlertModalStore } from "@/stores";

import { useRouter } from "next/navigation";
import { fetchMasterInventoryId } from "@/actions";
import { Pencil, Trash2 } from "lucide-react";
import { useDeleteMasterMitra } from "@/features";
import { queryClient } from "@/lib/queryClient";

type Props = {
	data: IzMasterInventory[];
	isLoading: boolean;
};

export default function TablelMasterMitra({ data, isLoading }: Props) {
	const { open } = useAlertModalStore();
	const router = useRouter();

	const { mutate } = useDeleteMasterMitra();

	const handleDelete = useCallback(
		(id: string) => {
			mutate(id);
		},
		[mutate]
	);

	const handleOpenModal = useCallback(
		(id: string) => {
			open({
				title: "Delet Data Master Inventory",
				desc: "This partner data deletion is permanent and cannot be undone. All related content will be deleted.?",
				size: "sm",
				children: (
					<AlertDialogFooter>
						<AlertDialogCancel className="cursor-pointer">
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => handleDelete(id)}
							variant={"destructive"}
							className="cursor-pointer"
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				),
			});
		},
		[open, handleDelete]
	);

	const handleEdit = useCallback(
		async (id: string) => {
			router.push(`/dashboard/master-inventory/${id}`);
		},
		[router]
	);

	const handleMoseEnter = useCallback(async (id: string) => {
		await queryClient.prefetchQuery({
			queryKey: ["master-mitra-cache", id],
			queryFn: async () => {
				const res = await fetchMasterInventoryId(id);
				return res.data;
			},
			staleTime: 1000 * 60, // 1 menit,
		});
	}, []);

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
					name: "Id Mitra",
					indexData: "kode_mitra",
				},
				{
					name: "name",
					indexData: "nama",
				},
				{
					name: "telepon",
					indexData: "telepon",
				},
				{
					name: "alamat",
					indexData: "alamat",
				},
				{
					name: "Aksi",
					indexData: "Aksi",
					render(row, i, item) {
						// console.log("render args:", { row, i, item });
						if (!item?.id) return null;
						return (
							<ActionDropdown
								items={[
									{
										label: "Edit",
										variant: "primary",
										onClick: () => handleEdit(item.id),
										onMoseEnter: () => handleMoseEnter(item.id),
										icons: Pencil,
									},
									{
										label: "Delete",
										separatorBefore: true,
										variant: "destructive",
										onClick: () => handleOpenModal(item.id),
										icons: Trash2,
									},
								]}
							/>
						);
					},
				},
			]}
		/>
	);
}
