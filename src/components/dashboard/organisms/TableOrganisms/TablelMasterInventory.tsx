"use client";
import { IzMasterInventory, IzStatusEnumInventory } from "@/schema";
import React, { useCallback } from "react";
import DataTable from "../../molecules/DataTable";
import ActionDropdown from "../../molecules/ActionDropdown";
import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useAlertModalStore, useFormModalStore } from "@/stores";

import { FormatRupiah } from "@/utils/formatRupiah";
import { useRouter } from "next/navigation";
import { fetchMasterInventoryId } from "@/actions";
import { FileMinus2, FilePlus2, Pencil, Trash2 } from "lucide-react";
import { useDeletMasterInventory } from "@/features";
import { queryClient } from "@/lib/queryClient";
import { FormInOutInventory } from "../FormOrganisms";

type Props = {
	data: IzMasterInventory[];
	isLoading: boolean;
};

export default function TablelMasterInventory({ data, isLoading }: Props) {
	const { open } = useAlertModalStore();
	const { open: OpenDataInventoryOut } = useFormModalStore()
	const router = useRouter();

	const { mutate } = useDeletMasterInventory();
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

	// router push edit
	const handleEdit = useCallback(
		async (id: string) => {
			router.push(`/dashboard/master-inventory/${id}`);
		},
		[router]
	);

	// Prefetch data on hover
	const handleMoseEnter = useCallback(async (id: string) => {
		await queryClient.prefetchQuery({
			queryKey: ["master-inventory-cache", id],
			queryFn: async () => {
				const res = await fetchMasterInventoryId(id);
				return res.data;
			},
			staleTime: 1000 * 60, // 1 menit,
		});
	}, []);

	const handleInventoryOutIn = useCallback(async (id: string, status: IzStatusEnumInventory) => {
		OpenDataInventoryOut({
			title: `Inventory ${status}`,
			children: <FormInOutInventory id={id} statusType={status} />
		})
		document.body.style.pointerEvents = "auto";
	}, [OpenDataInventoryOut])

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
					name: "kode_barang",
					indexData: "kode_barang",
				},
				{
					name: "Name",
					indexData: "name",
				},
				{
					name: "Satuan",
					indexData: "satuan",
				},
				{
					name: "Katagory",
					indexData: "katagory",
				},
				{
					name: "Stok tersedia",
					indexData: "stock",
				},
				{
					name: "Harga beli",
					indexData: "harga_beli",
					render(_value, _index, items) {
						return FormatRupiah(items.harga_beli);
					},
				},
				{
					name: "Harga jual",
					indexData: "harga_jual",
					render(_value, _index, items) {
						return FormatRupiah(items.harga_jual);
					},
				},
				{
					name: "Aksi",
					indexData: "Aksi",
					render(_value, _index, items) {
						if (!items?.id) return null;
						return (
							<ActionDropdown
								items={[
									{
										label: "Edit",
										variant: "primary",
										onClick: () => handleEdit(items.id),
										onMouseEnter: () => handleMoseEnter(items.id),
										icons: Pencil,
									},
									{
										label: "OUT",
										variant: "ghost",
										onClick: () => handleInventoryOutIn(items.id, "OUT"),
										onMouseEnter: () => handleMoseEnter(items.id),
										icons: FileMinus2,
									},
									{
										label: "IN",
										variant: "secondary",
										onClick: () => handleInventoryOutIn(items.id, "IN"),
										onMouseEnter: () => handleMoseEnter(items.id),
										icons: FilePlus2,
									},
									{
										label: "Delete",
										separatorBefore: true,
										variant: "destructive",
										onClick: () => handleOpenModal(items.id),
										onMouseEnter: () => handleMoseEnter(items.id),
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
