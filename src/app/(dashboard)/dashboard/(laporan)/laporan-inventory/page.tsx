"use client";

import React from "react";
import { PeginationList } from "@/components/dashboard/molecules";
import TopTableHeader from "@/components/dashboard/organisms/TopTableHeader";
import ErrorState from "@/components/dashboard/atoms/ErrorState";
import { useGetLaporanInventory } from "@/features";
import { TablelLaporanInventory } from "@/components/dashboard/organisms";

export default function Page() {

    // Fetch Data
    const { data, isLoading, isError, refetch } = useGetLaporanInventory();

    if (isError) return <ErrorState onRetry={() => refetch()} />;

    return (
        <div className="bg-background-secondary rounded-lg space-y-2 relative">
            <TopTableHeader total={Number(data?.data.total) || 0} isOpenLaporan={true} />
            <div className="p-3 max-w-[64.3rem]">
                <TablelLaporanInventory data={data?.data.data} isLoading={isLoading} />
            </div>
            <PeginationList totalData={Number(data?.data.total)} />
        </div>
    );
}
