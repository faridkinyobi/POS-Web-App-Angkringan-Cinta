"use client";

import { PeginationList } from "@/components/dashboard/molecules";
import TopTableHeader from "@/components/dashboard/organisms/TopTableHeader";
import React, { useCallback } from "react";
import {
	FormMasterMitra,
	TablelMasterMitra,
} from "@/components/dashboard/organisms";
import ErrorState from "@/components/dashboard/atoms/ErrorState";
import { useGetMasterMitra } from "@/features";
import { useFormModalStore } from "@/stores";
// import { useRouter } from "next/navigation";

export default function Page() {
	const { open } = useFormModalStore();

	// add data mitra open model
	const hanldeOpenFormMobel = useCallback(() => {
		open({ title: "open", children: <FormMasterMitra /> });
	}, [open]);

	// Fetch Data
	const { data, isLoading, isError, refetch } = useGetMasterMitra();

	if (isError) return <ErrorState onRetry={() => refetch()} />;

	return (
		<div className="bg-background-secondary rounded-lg space-y-2 relative">
			<TopTableHeader
				total={Number(data?.data.total) || 0}
				handleButtonAdd={hanldeOpenFormMobel}
			/>
			<div className="p-3">
				<TablelMasterMitra data={data?.data.data} isLoading={isLoading} />
			</div>
			<PeginationList totalData={Number(data?.data.total)} />
		</div>
	);
}
