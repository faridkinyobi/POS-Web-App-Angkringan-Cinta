export function TableSkeleton({ rows = 5 }: { rows?: number }) {
	return (
		<table className="w-full border-collapse border border-gray-200">
			<thead>
				<tr>
					<th className="border p-2 bg-gray-100">Nama</th>
					<th className="border p-2 bg-gray-100">Harga</th>
					<th className="border p-2 bg-gray-100">Aksi</th>
				</tr>
			</thead>
			<tbody>
				{Array.from({ length: rows }).map((_, i) => (
					<tr key={i}>
						<td className="border p-2">
							<div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
						</td>
						<td className="border p-2">
							<div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
						</td>
						<td className="border p-2">
							<div className="h-4 bg-gray-200 rounded animate-pulse w-10" />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
