"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellRing, LogOut, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AxiosInstance from "@/lib/axios";
import { useAlertModalStore } from "@/stores/useModelStore";
import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { getPathTitle } from "@/lib/getPathTitle";

export default function Topbar() {
	const [name, setName] = React.useState("");
	const { open } = useAlertModalStore();
	const pathname = usePathname();

	const titlePath = getPathTitle(pathname);

	const router = useRouter();

	React.useEffect(() => {
		const storedName = localStorage.getItem("name");
		if (storedName) {
			setName(storedName);
		}
	}, []);

	const handleOpenModalLogout = () => {
		open({
			title: "Logout",
			desc: "Are you sure want to logout?",
			size: "sm",
			children: (
				<AlertDialogFooter>
					<AlertDialogCancel className="cursor-pointer">
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleLogout} className="cursor-pointer">
						Logout
					</AlertDialogAction>
				</AlertDialogFooter>
			),
		});
	};

	const handleLogout = async () => {
		router.push("/pos-angkringan-cinta");
		await AxiosInstance.post("/auth/logout");
		localStorage.clear();
	};
	return (
		<header className="px-[24px] py-2 bg-background-secondary flex justify-between items-center">
			<div className="flex items-center gap-3">
				<SidebarTrigger className="-ml-1" />
				<span className="bg-accent-line w-0.5 h-5" />
				<p className="capitalize font-bold text-lg md:text-2xl">{titlePath}</p>
			</div>
			<div className="flex space-x-1 md:space-x-5 items-center">
				<div className="relative">
					<BellRing className="hover:rotate-12 w-6 h-6" />
					<Badge
						asChild
						className="h-5 min-w-5 rounded-full px-1 absolute -top-1 -right-1"
					>
						<Link href="/">8</Link>
					</Badge>
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger className="text-blue-700 outline-0 border-0 focus:border-0 flex gap-2 items-center cursor-pointer hover:underline">
						<Avatar>
							<AvatarImage alt="avatar" src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						{name}
					</DropdownMenuTrigger>
					<DropdownMenuContent sideOffset={10} className="mr-[24px] space-y-1">
						<DropdownMenuItem variant={"primary"}>
							<User />
							Profile
						</DropdownMenuItem>
						<DropdownMenuItem
							variant="destructive"
							onClick={handleOpenModalLogout}
							className="cursor-pointer"
						>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
