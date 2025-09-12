"use client";
import Image from "next/image";
import React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from "@/components/ui/sidebar";

import SidebarMenuList from "../molecules/SidebarMenuList";
import { menuSidebar } from "@/app/constants/menuSidebar";
export default function SidebarMain({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<Image
					src="/logo.png"
					width={90}
					height={60}
					alt="Logo Angkringan Cinta"
					className="h-auto w-auto"
				/>
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenuList Items={menuSidebar} />
			</SidebarContent>
		</Sidebar>
	);
}
