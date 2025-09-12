import React from "react";

type Props = { title: string; id: string; Name: string; Telefon: string };

export default function InformationMitra({ title, id, Name, Telefon }: Props) {
	return (
		<div className="space-y-3 print:space-y-1.5">
			<p className="capitalize text-base font-semibold py-2 border-b border-b-accent-line border-dashed print:py-1 print:text-sm print:font-medium">
				{title}
			</p>
			<div className="text-base font-medium py-2 space-y-2 border-b border-b-accent-line print:py-1 print:text-sm print:font-normal print:space-y-1">
				<p className="flex justify-between">
					Id
					<span className="text-foreground-secondary">{id}</span>
				</p>
				<p className="flex justify-between capitalize">
					Name
					<span className="capitalize text-foreground-secondary">{Name}</span>
				</p>
				<p className="flex justify-between">
					Telefon
					<span className="text-foreground-secondary">{Telefon}</span>
				</p>
			</div>
		</div>
	);
}
