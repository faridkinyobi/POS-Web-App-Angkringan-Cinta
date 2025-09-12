"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonDetailTransaksi() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 mt-3">

			{/* Mitra Information */}
			<div className="space-y-2 border-b pb-4">
				<Skeleton className="h-4 w-24" />
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-36" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-36" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-36" />
					</div>
				</div>
			</div>

			{/* Transaksi Information */}
			<div className="space-y-2 border-b pb-4">
				<Skeleton className="h-4 w-32" />
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-28" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-28" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-20" />
					</div>
				</div>
			</div>


			<div className="space-y-3">
				<Skeleton className="h-4 w-28" /> {/* Transaksi Detail title */}
				<div className="flex justify-between items-center border-b pb-3">
					<Skeleton className="h-4 w-40" />
					<Skeleton className="h-4 w-16" />
				</div>

				<div className="space-y-2">
					{[...Array(5)].map((_, i) => (
						<div key={i} className="flex justify-between">
							<Skeleton className="h-4 w-28" />
							<Skeleton className="h-4 w-20" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
