import React from "react";

type Props = { title: string; Officer: string; Date: string; Status: string };

export default function InformationTransaksi({
	title,
	Officer,
	Date,
	Status,
}: Props) {
	return (
		<div className="space-y-3 print:space-y-1.5">
			<p className="capitalize text-base font-semibold py-2 border-b border-b-accent-line border-dashed print:py-1 print:text-sm print:font-medium">
				{title}
			</p>
			<div className="text-base font-medium py-2 space-y-2 border-b border-b-accent-line print:py-1 print:text-sm print:font-normal print:space-y-1">
				<p className="flex justify-between">
					Date
					<span className="text-foreground-secondary">{Date}</span>
				</p>
				<p className="flex justify-between capitalize">
					Officer
					<span className="capitalize text-foreground-secondary">
						{Officer}
					</span>
				</p>
				<p className="flex justify-between">
					Paymen Status
					<span className="text-foreground-secondary uppercase">{Status}</span>
				</p>
			</div>
		</div>
	);
}
