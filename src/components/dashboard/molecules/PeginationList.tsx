import React from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useQueryParamStore } from "@/stores";

export default function PeginationList({
	totalData = 10,
}: {
	totalData?: number;
}) {
	const { page, perPage, setQueryParamsStore } = useQueryParamStore();

	const handleChangePage = (newPage: number) => {
		if (newPage < 1 || newPage > totalData) return;
		setQueryParamsStore({ page: String(newPage) });
	};
	if (!totalData) return null;
	const totalPages = Math.ceil(Number(totalData ?? 0) / Number(perPage ?? 1));

	let pages: (number | string)[] = [];

	if (totalPages <= 7) {
		// Semua halaman pages
		pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	} else {
		if (Number(page) <= 4) {
			// pages di awal
			pages = [1, 2, 3, 4, 5, "...", totalPages];
		} else if (Number(page) > totalPages - 4) {
			// page di akhir
			pages = [
				1,
				"...",
				...Array.from({ length: 5 }, (_, i) => totalPages - 4 + i),
			];
		} else {
			// page di tengah
			pages = [
				1,
				"...",
				Number(page) - 1,
				Number(page),
				Number(page) + 1,
				"...",
				totalPages,
			];
		}
	}

	return (
		<Pagination className="py-6">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={(e) => {
							e.preventDefault();
							handleChangePage(Number(page) - 1);
						}}
					/>
				</PaginationItem>
				{pages?.map((p, idx) => (
					<PaginationItem key={idx}>
						{p === "..." ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink
								isActive={Number(page) === Number(p)}
								onClick={(e) => {
									e.preventDefault();
									handleChangePage(Number(p));
								}}
								className="cursor-pointer"
							>
								{p}
							</PaginationLink>
						)}
					</PaginationItem>
				))}
				<PaginationItem>
					{totalPages > 5 && <PaginationEllipsis />}
				</PaginationItem>

				<PaginationItem>
					<PaginationNext
						className={
							Number(page) === totalPages
								? "pointer-events-none opacity-50"
								: ""
						}
						onClick={(e) => {
							e.preventDefault();
							handleChangePage(Number(page) + 1);
						}}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
