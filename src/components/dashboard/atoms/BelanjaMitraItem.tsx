import { Button } from "@/components/ui/button";
import { useBlanjaStore } from "@/stores/useBlanjaStore";
import { ICartItem } from "@/types";
import { FormatRupiah } from "@/utils/formatRupiah";
import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";

export default function BelanjaMitraItem({
	id,
	harga_jual,
	total,
	qty,
	name,
}: ICartItem) {
	const { removeItem, updateQty } = useBlanjaStore();
	return (
		<div className="shadow-sm p-2 space-y-1">
			<div className="flex justify-between">
				<h4 className="text-lg font-semibold">{name}</h4>
				{/* total */}
				<p className="text-foreground-secondary">{FormatRupiah(total)}</p>
			</div>
			{/* harga */}
			<p className="text-foreground-secondary">{FormatRupiah(harga_jual)}</p>
			<div className="flex justify-between">
				<div className="flex gap-3">
					<Button
						asChild
						size={"icon"}
						variant={"ghost"}
						className="shadow-sm rounded-full cursor-pointer"
						onClick={() => updateQty(id, "plus")}
					>
						<Plus />
					</Button>
					<span className="size-6 text-center bg-background text-base font-medium">
						{qty}
					</span>
					<Button
						asChild
						size={"icon"}
						variant={"ghost"}
						className={`${Number(qty) <= 1 ? "pointer-events-none" : "shadow-sm rounded-full cursor-pointer"} `}
						onClick={() => updateQty(id, "minus")}
					>
						<Minus />
					</Button>
				</div>
				<Trash2
					className="size-6 text-destructive cursor-pointer"
					onClick={() => removeItem(id)}
				/>
			</div>
		</div>
	);
}
