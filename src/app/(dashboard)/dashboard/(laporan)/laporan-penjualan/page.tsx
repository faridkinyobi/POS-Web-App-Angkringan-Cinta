"use client";

import React from "react";
import { PeginationList } from "@/components/dashboard/molecules";
import TopTableHeader from "@/components/dashboard/organisms/TopTableHeader";
import ErrorState from "@/components/dashboard/atoms/ErrorState";
import { useGetLaporanPenjualan } from "@/features";
import { TablelLaporanPenjualan } from "@/components/dashboard/organisms";
import { IzLaporanPenjualan } from "@/schema";

export const dummyLaporanPenjualan: IzLaporanPenjualan[] = [
    {
        id: "1",
        createdAt: new Date("2025-09-01"),
        qty: 50,
        omzet: 150000,
        labaKotor: 50000,
        masterInventory: {
            kode_barang: "INV001",
            name: "Pop Es Coklat",
            harga_beli: 2000,
            harga_jual: 3000,
        },
    },
    {
        id: "2",
        createdAt: new Date("2025-09-01"),
        qty: 30,
        omzet: 210000,
        labaKotor: 60000,
        masterInventory: {
            kode_barang: "INV002",
            name: "Mie Goreng",
            harga_beli: 5000,
            harga_jual: 7000,
        },
    },
    {
        id: "3",
        createdAt: new Date("2025-09-02"),
        qty: 20,
        omzet: 120000,
        labaKotor: 40000,
        masterInventory: {
            kode_barang: "INV003",
            name: "Teh Botol",
            harga_beli: 4000,
            harga_jual: 6000,
        },
    },
];
export default function Page() {

    // Fetch Data
    const { data, isLoading, isError, refetch } = useGetLaporanPenjualan();

    if (isError) return <ErrorState onRetry={() => refetch()} />;

    return (
        <div className="bg-background-secondary rounded-lg space-y-2 relative">
            <TopTableHeader total={Number(12) || 0} isOpenLaporan={true} />
            <div className="p-3 max-w-[65rem]">
                <TablelLaporanPenjualan data={dummyLaporanPenjualan} isLoading={false} />
            </div>
            <PeginationList totalData={Number(12)} />
        </div>
    );
}
