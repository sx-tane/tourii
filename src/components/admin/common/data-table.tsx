import React from "react";

export interface TableColumn<T = any> {
	key: string;
	header: string;
	render: (item: T, index: number) => React.ReactNode;
	className?: string;
}

interface DataTableProps<T = any> {
	columns: TableColumn<T>[];
	data: T[];
	selectedIds: string[];
	onToggleSelect: (id: string) => void;
	onToggleSelectAll: () => void;
	getItemId: (item: T) => string;
	isLoading?: boolean;
	emptyMessage?: string;
	className?: string;
}

export function DataTable<T = any>({
	columns,
	data,
	selectedIds,
	onToggleSelect,
	onToggleSelectAll,
	getItemId,
	isLoading = false,
	emptyMessage = "No data available",
	className = "",
}: DataTableProps<T>) {
	const allSelected = selectedIds.length === data.length && data.length > 0;

	if (isLoading) {
		return (
			<div className="rounded-lg bg-white shadow-lg p-8">
				<div className="text-center text-charcoal">Loading...</div>
			</div>
		);
	}

	return (
		<div className={`overflow-hidden rounded-lg bg-white shadow-lg ${className}`}>
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-charcoal text-white">
						<tr>
							<th className="px-4 py-4 text-left font-semibold">
								<input
									type="checkbox"
									checked={allSelected}
									onChange={onToggleSelectAll}
									className="rounded border-warmGrey2 text-red focus:ring-red"
								/>
							</th>
							{columns.map((column) => (
								<th
									key={column.key}
									className={`px-6 py-4 text-left font-semibold ${column.className || ""}`}
								>
									{column.header}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="divide-y divide-warmGrey2">
						{data.length > 0 ? (
							data.map((item, index) => {
								const itemId = getItemId(item);
								const isSelected = selectedIds.includes(itemId);
								
								return (
									<tr
										key={itemId}
										className={`${index % 2 === 0 ? "bg-white" : "bg-warmGrey"} ${
											isSelected ? "ring-2 ring-blue-200" : ""
										}`}
									>
										<td className="px-4 py-4">
											<input
												type="checkbox"
												checked={isSelected}
												onChange={() => onToggleSelect(itemId)}
												className="rounded border-warmGrey2 text-red focus:ring-red"
											/>
										</td>
										{columns.map((column) => (
											<td
												key={column.key}
												className={`px-6 py-4 ${column.className || ""}`}
											>
												{column.render(item, index)}
											</td>
										))}
									</tr>
								);
							})
						) : (
							<tr>
								<td
									colSpan={columns.length + 1}
									className="px-6 py-8 text-center text-charcoal"
								>
									{emptyMessage}
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}