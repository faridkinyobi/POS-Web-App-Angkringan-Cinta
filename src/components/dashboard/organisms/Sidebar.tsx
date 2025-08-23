"use client";
import Image from "next/image";
import Link from "next/link";
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
				<Link
					href="/dashboard"
					aria-label="dashboard"
					className="border-none outline-0 focus-visible:ring-2"
				>
					<Image
						src="/logo.png"
						width={86}
						height={54}
						alt="Logo Angkringan Cinta"
						priority
						className="h-auto w-auto"
					/>
				</Link>
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenuList Items={menuSidebar} />
			</SidebarContent>
		</Sidebar>
	);
}
