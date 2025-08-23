import { Button } from "@/components/ui/button";
import { useBlanjaStore, usePlaceOrder } from "@/stores/useBlanjaStore";
import { FormatRupiah } from "@/utils/formatRupiah";

type CartSummaryProps = {
	subTotal: number;
	discount?: number;
	grandTotal: number;
	amount_paid?: number;
	refund?: number;
};

export function CartSummary({
	subTotal,
	grandTotal,
	amount_paid,
	refund,
}: CartSummaryProps) {
	const { isNext, toggle } = usePlaceOrder();
	const { items } = useBlanjaStore();
	return (
		<div className="space-y-4.5 py-3 w-full">
			<div className="space-y-2 text-base">
				{/* Sub Total*/}
				<div className="flex justify-between items-center">
					<p className="font-bold">Sub Total</p>
					<p className="text-foreground-secondary font-medium">
						{FormatRupiah(subTotal)}
					</p>
				</div>

				{/* Diskon*/}
				<div className="flex justify-between items-center">
					<p className="font-bold">Diskon</p>
					<p className="text-foreground-secondary font-medium">0</p>
				</div>

				{/* Grand Total*/}
				<div className="flex justify-between items-center">
					<p className="font-bold">Grand Total</p>
					<p className="text-foreground-secondary font-medium">
						{FormatRupiah(grandTotal)}
					</p>
				</div>
				{/* Amount Paid & Refund*/}
				{isNext && (
					<div className="space-y-2">
						{/* Amount Paid */}
						<div className="flex justify-between items-center">
							<p className="font-bold">Amount Paid</p>
							<p className="text-foreground-secondary font-medium">
								{FormatRupiah(Number(amount_paid))}
							</p>
						</div>
						{/* Refund */}
						<div className="flex justify-between items-center">
							<p className="font-bold">Refund</p>
							<p className="text-foreground-secondary font-medium">
								{FormatRupiah(Number(refund))}
							</p>
						</div>
					</div>
				)}
			</div>
			{!isNext && (
				<Button
					className="w-full"
					disabled={items.length === 0}
					onClick={() => toggle()}
				>
					Place Order
				</Button>
			)}
		</div>
	);
}
