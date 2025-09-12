import { FormatRupiah } from "@/utils/formatRupiah";
import React from "react";

type Props = {
	subTotal: number;
	grandTotal: number;
	amount_paid: number;
	refund: number;
};

export default function DetailSummery({
	subTotal,
	grandTotal,
	amount_paid,
	refund,
}: Props) {
	return (
		<div className="space-y-2 text-base px-3 print:px-0 print:text-sm print:space-y-1">
			{/* Sub Total*/}
			<div className="flex justify-between items-center">
				<p className="font-semibold text-foreground-secondary print:font-medium">
					Sub Total
				</p>
				<p className="font-medium print:font-normal">
					{FormatRupiah(subTotal)}
				</p>
			</div>

			{/* Diskon*/}
			<div className="flex justify-between items-center">
				<p className="font-semibold text-foreground-secondary print:font-medium">
					Diskon
				</p>
				<p className="font-medium print:font-normal">0</p>
			</div>

			{/* Grand Total*/}
			<div className="flex justify-between items-center">
				<p className="font-semibold text-foreground-secondary print:font-medium">
					Grand Total
				</p>
				<p className="font-medium print:font-normal">
					{FormatRupiah(grandTotal)}
				</p>
			</div>
			{/* Amount Paid & Refund*/}

			{/* Amount Paid */}
			<div className="flex justify-between items-center">
				<p className="font-semibold text-foreground-secondary print:font-medium">
					Amount Paid
				</p>
				<p className="font-medium print:font-normal">
					{FormatRupiah(Number(amount_paid))}
				</p>
			</div>
			{/* Refund */}
			<div className="flex justify-between items-center">
				<p className="font-semibold text-foreground-secondary print:font-medium">
					Refund
				</p>
				<p className="font-medium print:font-normal">
					{FormatRupiah(Number(refund))}
				</p>
			</div>
		</div>
	);
}
