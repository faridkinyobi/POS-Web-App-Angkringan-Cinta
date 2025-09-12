import React from "react";
import BelanjaMitralist from "../molecules/BelanjaMitraLinst";
import { CartSummary } from "../atoms/CartSummary";
import { useBlanjaStore, usePlaceOrder } from "@/stores/useBlanjaStore";
import { OrderForm } from "./FormOrganisms/FormBlanja";

export default function SheetBelanjaMitra(ishidden: { ishidden?: boolean }) {
	const { isNext } = usePlaceOrder();
	const { grandTotal, subTotal } = useBlanjaStore();

	return (
		<div
			className={`${ishidden.ishidden ? "hidden" : "block"} p-4 w-[265px] sticky bg-background-secondary rounded-lg flex flex-col justify-between`}
		>
			<div className="w-full space-y-4">
				<h3 className="md:text-3xl font-semibold">Card</h3>
				{!isNext ? <BelanjaMitralist /> : <OrderForm />}
			</div>
			{!isNext && <CartSummary subTotal={subTotal} grandTotal={grandTotal} />}
		</div>
	);
}
