"use client";
import React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { IDataTableProps } from "@/types";

export default function DataTable({
	columns,
	sourceData = [],
	isLoading,
}: IDataTableProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					{columns.map((col) => {
						return (
							<TableHead key={`row ${col.indexData}`}>{col.name}</TableHead>
						);
					})}
				</TableRow>
			</TableHeader>
			<TableBody>
				{isLoading ? (
					sourceData.map((items, i) => {
						return (
							<TableRow key={i}>
								{columns?.map((col) => {
									const rowData = items[col.indexData];
									if (col?.render) {
										return (
											<TableCell key={`${col.indexData}`}>
												{col.render(rowData, i, items)}
											</TableCell>
										);
									}
									return (
										<TableCell
											key={`data-row-${col.indexData}`}
											className="whitespace-normal break-words"
										>
											{typeof rowData === "object" || Array.isArray(rowData)
												? JSON.stringify(rowData)
												: rowData}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})
				) : (
					<TableRow>
						{Array.from({ length: columns.length }).map((_, i) => (
							<TableCell key={i}>
								<div className="h-4 bg-gray-200 rounded animate-pulse w-auto" />
							</TableCell>
						))}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
