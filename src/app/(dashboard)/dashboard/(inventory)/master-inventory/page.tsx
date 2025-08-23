"use client";

import { PeginationList } from "@/components/dashboard/molecules";
import TopTableHeader from "@/components/dashboard/organisms/TopTableHeader";
import React, { useCallback } from "react";

import { SearchLoadingBar } from "@/components/dashboard/atoms/SearchLoadingBar";
import ErrorState from "@/components/dashboard/atoms/ErrorState";
import { useGetMasterInventory } from "@/features";
import { TablelMasterInventory } from "@/components/dashboard/organisms";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();
	// Fetch Data
	const handleButtonAdd = useCallback(() => {
		router.push("/dashboard/master-inventory/add-inventory");
	}, [router]);

	const { data, isLoading, isError, refetch } = useGetMasterInventory();

	if (isError) return <ErrorState onRetry={() => refetch()} />;

	return (
		<div className="bg-background-secondary rounded-lg space-y-2 relative">
			{isLoading && <SearchLoadingBar />}
			<TopTableHeader
				total={Number(data?.data.total) || 0}
				handleButtonAdd={handleButtonAdd}
			/>
			<div className="p-3">
				<TablelMasterInventory
					data={data?.data.data ?? []}
					isLoading={isLoading}
				/>
			</div>
			<PeginationList totalData={Number(data?.data.total)} />
		</div>
	);
}
