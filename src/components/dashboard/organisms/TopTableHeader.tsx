"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import TableFilter from "../atoms/TableFilter";
import { useQueryParamStore } from "@/stores";

interface ItopHaederProps {
	isOpenLaporan?: boolean;
	total: number;
	handleButtonAdd?: () => void;
}
export default function TopTableHeader({
	isOpenLaporan,
	total,
	handleButtonAdd,
}: ItopHaederProps) {
	const { setQueryParamsStore, endDate, startDate } = useQueryParamStore();

	return (
		<div className="space-y-2">
			<div className="py-5 border-b bg-transparent border-b-border-secondary">
				<p className="px-3">Total Data: {total}</p>
			</div>
			<div className="py-4 px-3 space-y-3 bg-background">
				{isOpenLaporan && (
					<div className="flex gap-3">
						<div className="space-y-3">
							<Label>Tanggal Mulai</Label>
							<Input
								placeholder="Search"
								type="date"
								value={startDate}
								onChange={(e) =>
									setQueryParamsStore({ startDate: e.target.value })
								}
							/>
						</div>
						<div className="space-y-3">
							<Label>Tanggal Akhir</Label>
							<Input
								placeholder="Search"
								type="date"
								value={endDate}
								onChange={(e) =>
									setQueryParamsStore({ endDate: e.target.value })
								}
							/>
						</div>
					</div>
				)}
				<div className="flex flex-wrap justify-between gap-2">
					<TableFilter />
					{handleButtonAdd && (
						<Button className="cursor-pointer" onClick={handleButtonAdd}>
							Add Data
						</Button>
					)}
					{isOpenLaporan && (
						<div className="flex">
							<Button
								className="cursor-pointer rounded-none data-[active=true]:text-primary data-[active=true]:bg-accent data-[active=true]:border-b data-[active=true]:border-primary  "
								variant={"ghost"}
								isActive={true}
							>
								Penjualan Menu
							</Button>
							<Button
								className="cursor-pointer rounded-none data-[active=false]:text-primary/70 data-[active=false]:border-b data-[active=false]:border-primary/70"
								variant={"ghost"}
							>
								Belanja mitra
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
