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

import { FormatRupiah } from "@/utils/formatRupiah";
import { useRouter } from "next/navigation";
import { fetchMasterInventoryId } from "@/actions";
import { Check, Pencil, Trash2 } from "lucide-react";
import { useDeletMasterInventory } from "@/features";
import { queryClient } from "@/lib/queryClient";
import dayjs from "dayjs";
type Props = {
	data: IzMasterInventory[];
	isLoading: boolean;
};

export default function TablelMasterInventory({ data, isLoading }: Props) {
	const { open } = useAlertModalStore();
	const router = useRouter();

	const { mutate } = useDeletMasterInventory();

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
			queryKey: ["master-inventory-cache", id],
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
					name: "Tanggal",
					indexData: "createdAt",
					render(value, rowIndex, rowData) {
						return dayjs(rowData.createdAt).format("YYYY-MM-DD");
					},
				},
				{
					name: "Id order",
					indexData: "order_code",
				},
				{
					name: "metode",
					indexData: "metode_pay",
				},
				{
					name: "status",
					indexData: "payment_status",
					render(value, rowIndex, rowData) {
						return (
							<span
								className={` p-1 rounded-lg text-white ${rowData.payment_status === "paid" ? "bg-green-500" : rowData.payment_status === "pending" ? "bg-yellow-500" : ""}`}
							>
								{rowData.payment_status}
							</span>
						);
					},
				},
				{
					name: "Jumlah item",
					indexData: "items",
					render: (_value, _index, row) => {
						return row.DetailMitraBelanja?.length || 0;
					},
				},
				{
					name: "Grand total",
					indexData: "grand_total",
				},
				{
					name: "Amount paid",
					indexData: "amount_paid",
					render(value, rowIndex, rowData) {
						return FormatRupiah(rowData.amount_paid);
					},
				},
				{
					name: "refund",
					indexData: "refund",
					render(value, rowIndex, rowData) {
						return FormatRupiah(rowData.refund);
					},
				},
				{
					name: "Aksi",
					indexData: "Aksi",
					render(row, i, items) {
						// console.log("render args:", { row, i, item });
						if (!items?.id) return null;
						return (
							<ActionDropdown
								items={[
									{
										label: "Paid",
										variant: "primary",
										onClick: () => handleEdit(items.id),
										onMoseEnter: () => handleMoseEnter(items.id),
										icons: Check,
									},
									{
										label: "Delete",
										separatorBefore: true,
										variant: "destructive",
										onClick: () => handleOpenModal(items.id),
										onMoseEnter: () => handleMoseEnter(items.id),
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
