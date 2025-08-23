import React from "react";
import PackImg from "@/assets/paket-mitra-1.png";
import PackImg2 from "@/assets/paket-mitra-2.png";
import PackImg3 from "@/assets/paket-mitra-3.png";
import PackImg4 from "@/assets/paket-mitra-4.png";
import SelectionHeader from "../molecules/SelectionHeader";

import PaketCard, { PaketItem } from "../molecules/PaketCard";

export default function PackagesLending() {
	return (
		<section className="py-5 md:px-0 space-y-6">
			{/* sub title */}
			<SelectionHeader
				className="items-start px-2 mb-4"
				title="Packages Offered"
			/>

			{/* contain package */}
			<div className="flex flex-wrap gap-6 justify-center md:justify-between">
				{dataPaket.map((item, i) => (
					<PaketCard key={i} {...item} />
				))}
			</div>
		</section>
	);
}

// data
const dataPaket: PaketItem[] = [
	{
		id: 1,
		img: PackImg,
		alt: "Paket A Kemitraan Angkringan Cinta",
		type: "A",
		price: 8500000,
		title: "Full Container",
		size: "150 X 150 Cm",
	},
	{
		id: 2,
		img: PackImg2,
		alt: "Paket B Kemitraan Angkringan Cinta",
		type: "B",
		price: 8000000,
		title: "Gerobak Container",
		size: "150 X 150 Cm",
	},
	{
		id: 3,
		img: PackImg3,
		alt: "Paket C Kemitraan Angkringan Cinta",
		type: "C",
		price: 7500000,
		title: "Semi-Con Permanen",
		size: "150 X 150 Cm",
	},
	{
		id: 4,
		img: PackImg4,
		alt: "Paket D Kemitraan Angkringan Cinta",
		type: "D",
		price: 6500000,
		title: "Meja Container",
		size: "150 X 150 Cm",
	},
];
