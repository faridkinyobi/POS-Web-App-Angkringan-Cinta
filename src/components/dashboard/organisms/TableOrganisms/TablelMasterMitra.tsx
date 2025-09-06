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
import { useAlertModalStore, useFormModalStore } from "@/stores";
import { fetchMasterMitraId } from "@/actions";
import { Pencil, Trash2 } from "lucide-react";
import { useDeleteMasterMitra } from "@/features";
import { queryClient } from "@/lib/queryClient";
import { FormMasterMitra } from "../FormOrganisms";

type Props = {
	data: IzMasterInventory[];
	isLoading: boolean;
};

export default function TablelMasterMitra({ data, isLoading }: Props) {
	const { open } = useAlertModalStore();
	const { open: openModelForm } = useFormModalStore()
	const { mutate } = useDeleteMasterMitra();

	// delete data
	const handleDelete = useCallback(
		(id: string) => {
			mutate(id);
		},
		[mutate]
	);

	//open model delete data mitra
	const handleOpenModal = useCallback(
		(id: string) => {
			open({
				title: "Delet Data Master Mitra",
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

	// edit data mitra open model
	const handleEdit = useCallback((id: string) => {
		openModelForm({ title: "Edit", children: <FormMasterMitra id={id} /> });
		document.body.style.pointerEvents = "auto";
	}, [openModelForm]);

	// Prefetch data on hover
	const handleMoseEnter = useCallback(async (id: string) => {
		await queryClient.prefetchQuery({
			queryKey: ["master-mitra-cache", id],
			queryFn: async () => {
				const res = await fetchMasterMitraId(id);
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
					render(_value, _index, item) {
						// console.log("render args:", { row, i, item });
						if (!item?.id) return null;
						return (
							<ActionDropdown
								items={[
									{
										label: "Edit",
										variant: "primary",
										onClick: () => handleEdit(item.id),
										onMouseEnter: () => handleMoseEnter(item.id),
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
