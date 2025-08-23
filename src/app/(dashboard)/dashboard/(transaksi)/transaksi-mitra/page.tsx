"use client";

import { PeginationList } from "@/components/dashboard/molecules";
import TopTableHeader from "@/components/dashboard/organisms/TopTableHeader";
import React, { useCallback } from "react";
import {
	FormMasterMitra,
	TablelMasterMitra,
	TablelTransaksiMitra,
} from "@/components/dashboard/organisms";
import ErrorState from "@/components/dashboard/atoms/ErrorState";
import { useGetTransaksiBlanja } from "@/features";
import { useFormModalStore } from "@/stores";

export default function Page() {
	// const { open } = useFormModalStore();
	// const router = useRouter();
	// const hanldeOpenFormMobel = useCallback(() => {
	// 	open({ title: "open", children: <FormMasterMitra /> });
	// }, [open]);

	// Fetch Data
	const { data, isLoading, isError, refetch } = useGetTransaksiBlanja();
	// console.log(data, "transaksi");
	if (isError) return <ErrorState onRetry={() => refetch()} />;

	return (
		<div className="bg-background-secondary rounded-lg space-y-2 relative">
			<TopTableHeader
				total={Number(data?.data.total) || 0}
				// handleButtonAdd={hanldeOpenFormMobel}
			/>
			<div className="p-3">
				<TablelTransaksiMitra data={data?.data.data} isLoading={isLoading} />
			</div>
			<PeginationList totalData={Number(data?.data.total)} />
		</div>
	);
}
