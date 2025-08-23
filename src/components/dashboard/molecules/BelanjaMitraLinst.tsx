import React from "react";
import BelanjaMitraItem from "../atoms/BelanjaMitraItem";
import { useBlanjaStore } from "@/stores/useBlanjaStore";

export default function BelanjaMitralist() {
	const { items } = useBlanjaStore();
	// console.log(items);
	return (
		<div className=" flex-1 space-y-2 max-h-72 md:max-h-[480px] overflow-y-auto">
			<div className="space-y-2">
				{items.map((item, indexData) => (
					<BelanjaMitraItem key={`${indexData + 1}${item.id}`} {...item} />
				))}
			</div>
		</div>
	);
}
