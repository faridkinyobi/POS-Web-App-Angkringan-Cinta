"use client";
import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideIcon, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

type ActionItem = {
	label: string;
	onClick?: () => void;
	onMoseEnter?: () => void;
	separatorBefore?: boolean;
	variant?: "default" | "destructive" | "primary" | "secondary" | "ghost";
	icons?: LucideIcon;
};

export default function ActionDropdown({
	items = [],
}: {
	label?: string;
	items: ActionItem[];
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" aria-label="action dropdown">
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="px-4 space-y-1">
				{items.map((item, index) => (
					<React.Fragment key={index}>
						<DropdownMenuItem
							onClick={item.onClick}
							onMouseEnter={item.onMoseEnter}
							variant={item?.variant || "default"}
							className="cursor-pointer w-[124px] flex items-center gap-3"
						>
							{item.icons && <item.icons className="size-6" />}
							{item.label}
						</DropdownMenuItem>
					</React.Fragment>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
