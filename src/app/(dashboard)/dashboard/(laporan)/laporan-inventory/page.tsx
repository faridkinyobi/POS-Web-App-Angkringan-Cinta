"use client";

import React from "react";
import { PeginationList } from "@/components/dashboard/molecules";
import TopTableHeader from "@/components/dashboard/organisms/TopTableHeader";
import ErrorState from "@/components/dashboard/atoms/ErrorState";
import { useGetLaporanInventory } from "@/features";
import { TablelLaporanInventory } from "@/components/dashboard/organisms";
import { useSidebar } from "@/components/ui/sidebar";

export default function Page() {
    const { open } = useSidebar()
    // Fetch Data
    const { data, isLoading, isError, refetch } = useGetLaporanInventory();

    if (isError) return <ErrorState onRetry={() => refetch()} />;

    return (
        <div className="bg-background-secondary rounded-lg space-y-2 relative">
            <TopTableHeader total={Number(data?.data.total) || 0} isOpenLaporan={true} />
            <div className={`p-3 ${open ? "max-w-[64.3rem]" : "max-w-[76.9rem]"}`}>
                <TablelLaporanInventory data={data?.data.data} isLoading={isLoading} />
            </div>
            <PeginationList totalData={Number(data?.data.total)} />
        </div>
    );
}
