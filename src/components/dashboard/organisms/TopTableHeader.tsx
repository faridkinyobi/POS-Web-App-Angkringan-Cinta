"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import TableFilter from "../atoms/TableFilter";
import { useQueryParamStore } from "@/stores";
import { ShoppingCart } from "lucide-react";
import { useBlanjaStore } from "@/stores/useBlanjaStore";
import { Badge } from "@/components/ui/badge";

interface ItopHaederProps {
	isOpenLaporan?: boolean;
	isOpenLaporanPenjualan?: boolean
	total: number;
	handleButtonAdd?: () => void;
	handleButtonShopping?: () => void;
}
export default function TopTableHeader({
	isOpenLaporan,
	total = 0,
	handleButtonAdd,
	handleButtonShopping,
	isOpenLaporanPenjualan
}: ItopHaederProps) {
	const { setQueryParamsStore, endDate, startDate } = useQueryParamStore();
	const { items } = useBlanjaStore();

	return (
		<div className="space-y-2">
			<div className="py-5 border-b bg-transparent border-b-border-secondary">
				<p className="px-3">Total Data: {total}</p>
			</div>

			<div className={`flex flex-wrap justify-between  gap-2 py-4 px-3 bg-background ${!isOpenLaporanPenjualan ? "items-center" : "items-end"}`}>
				<TableFilter />

				{/* ADD end Shopping keranjang */}
				<div className="flex gap-2">
					{handleButtonAdd && (
						<Button className="cursor-pointer" onClick={handleButtonAdd}>
							Add Data
						</Button>
					)}
					{handleButtonShopping && (
						<div className="relative">
							<Button
								onClick={handleButtonShopping}
								className="cursor-pointer"
							>
								<Badge className="absolute bg-[#109900] text-center -top-2 -left-2 h-6 max-w-6 rounded-full px-2 -inset-2.5 text-base">
									{items.length}
								</Badge>

								<ShoppingCart className="w-4 h-4" />
							</Button>
						</div>
					)}
				</div>
				{/* Start & end Date */}
				{isOpenLaporan && (
					<div className="flex gap-3">
						<div className="space-y-3">
							<Label htmlFor="StartDate">Tanggal Mulai</Label>
							<Input
								id="startDate"
								type="date"
								value={startDate}
								onChange={(e) =>
									setQueryParamsStore({ startDate: e.target.value })
								}
							/>
						</div>
						<div className="space-y-3">
							<Label htmlFor="endDate">Tanggal Akhir</Label>
							<Input
								id="endDate"
								type="date"
								value={endDate}
								onChange={(e) =>
									setQueryParamsStore({ endDate: e.target.value })
								}
							/>
						</div>
					</div>
				)}

				{/* button Laporan penjualan end laporan belanja */}
				{isOpenLaporan && isOpenLaporanPenjualan && (
					<div className="flex">
						<Button
							className="rounded-none data-[active=true]:text-primary data-[active=true]:bg-accent data-[active=true]:border-b data-[active=true]:border-primary  "
							variant={"ghost"}
							isActive={true}
						>
							Penjualan Menu
						</Button>
						<Button
							className="rounded-none data-[active=false]:text-primary/70 data-[active=false]:border-b data-[active=false]:border-primary/70"
							variant={"ghost"}
						>
							Belanja mitra
						</Button>
					</div>
				)}
			</div>
		</div >
	);
}
