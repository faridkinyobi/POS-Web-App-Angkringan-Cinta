import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SidebarSkeleton() {
	return (
		<aside className="h-screen w-[266px] bg-background-secondary p-4 space-y-4">
			<Skeleton className="h-10 w-32" /> {/* Logo Placeholder */}
			<div className="space-y-3">
				{Array.from({ length: 10 }).map((_, i) => (
					<Skeleton key={i} className="h-5 w-full rounded-md" />
				))}
			</div>
		</aside>
	);
}
