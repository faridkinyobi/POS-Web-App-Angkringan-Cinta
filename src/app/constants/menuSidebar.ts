import {
	Store,
	ChartPie,
	GlassWater,
	Handshake,
	NotebookPen,
	ShoppingCart,
	LayoutDashboard,
	Settings,
} from "lucide-react";
import * as fetch from "@/actions";

import { TypeItemsMenu } from "@/types";

// export type TypePrefetchMenuItem = {
// 	prefetchQueryKey?: QueryKey;
// 	prefetchFn?: () => Promise<any>;
// };
// export type TypeSubMenuItem = {
// 	title: string;
// 	url: string;
// 	prefetchQueryKey?: [string];
// 	prefetchFn?: () => Promise<any>;
// };
// export type TypeItemsMenu = {
// 	icon?: LucideIcon;
// 	title: string;
// 	url?: string;
// 	isActive?: boolean;
// 	prefetchQueryKey?: [string];
// 	prefetchFn?: () => Promise<any>;
// 	items?: TypeSubMenuItem[] | null;
// };

export const menuSidebar: TypeItemsMenu[] = [
	{
		icon: LayoutDashboard,
		title: "dashboard",
		isActive: true,
		url: "/dashboard",
	},
	{
		icon: GlassWater,
		title: "Menage Menu",
		isActive: true,
		url: "/dashboard/Menage Menu",
	},
	{
		icon: Store,
		title: "Outlit  Cabang",
		isActive: true,
		url: "/dashboard/Outlit  Cabang",
	},
	{
		icon: Handshake,
		title: "Mitra",
		isActive: true,
		items: [
			{
				url: "/dashboard/Master Mitra",
				title: "Master Mitra",
				prefetchQueryKey: ["master-mitra-cache"],
				prefetchFn: () => fetch.fetchMasterMitra({}),
			},
			{
				url: "/dashboard/Mitra Belanja", title: "Mitra Belanja",
				prefetchQueryKey: ["master-mitra-cache"],
				prefetchFn: () => fetch.fetchBlanjaInventory({}),
			},
		],
	},
	{
		icon: ShoppingCart,
		title: "Transaksi",
		isActive: true,
		items: [
			{ url: "/dashboard/Transaksi Mitra", title: "Transaksi Mitra" },
			{ url: "/dashboard/Transaksi Menu", title: "Transaksi Umum" },
		],
	},
	{
		icon: ChartPie,
		title: "Inventory",
		isActive: true,
		items: [
			{
				url: "/dashboard/Master Inventory",
				title: "Master Inventory",
				prefetchQueryKey: ["master-inventory-cache"],
				prefetchFn: () => fetch.fetchMasterInventory({}),
			},
			{ url: "/dashboard/Inventory Outlet", title: "Inventory Outlet" },
			{ url: "/dashboard/Permintaan Stok", title: "Permintaan Stok" },
			{ url: "/dashboard/Pengiriman Stok", title: "Pengiriman Stok" },
		],
	},
	{
		icon: NotebookPen,
		title: "Laporan",
		isActive: true,
		items: [
			{ url: "/dashboard/Laporan", title: "Penjualan" },
			{ url: "/dashboard/Transaksi Umum", title: "Transaksi Umum" },
		],
	},
	{
		icon: Settings,
		title: "Setting",
		isActive: true,
		items: [
			{ url: "/dashboard/Karyawan", title: " Karyawan" },
			{ url: "/dashboard/Jawal Karyawan", title: "Jawal Karyawan" },
			{ url: "/dashboard/Pengguna", title: "Pengguna" },
			{ url: "/dashboard/Diskon", title: "Diskon" },
		],
	},
];
