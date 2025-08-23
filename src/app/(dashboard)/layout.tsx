import { FormDialogProvider } from "@/components/dashboard/organisms";
import SidebarMain from "@/components/dashboard/organisms/Sidebar";
import Topbar from "@/components/dashboard/organisms/Topbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { verifyTokenSession } from "@/lib/dal";
// import { redirect } from "next/navigation";

import React from "react";

export default async function layout({
	children,
}: {
	children: React.ReactNode;
}) {
	// const token = await verifyTokenSession();
	// // console.log(token);
	// if (!session) return null;
	return (
		<SidebarProvider>
			<SidebarMain />
			<SidebarInset>
				<Topbar key="topbar" />
				<div className="p-6">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
