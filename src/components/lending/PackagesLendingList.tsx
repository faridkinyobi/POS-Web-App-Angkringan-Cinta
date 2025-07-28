import React from "react";
import PackImg from "@/assets/paket-mitra-1.png";
import PackImg2 from "@/assets/paket-mitra-2.png";
import PackImg3 from "@/assets/paket-mitra-3.png";
import PackImg4 from "@/assets/paket-mitra-4.png";
import SelectionHeader from "./SelectionHeader";
import { SquaresExclude } from "lucide-react";
import { Button } from "../ui/button";
import { FormatRupiah } from "@/utils/formatRupiah";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

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

type PaketItem = {
	id: number;
	img: StaticImageData;
	alt: string;
	type: string;
	price: number;
	title: string;
	size: string;
};

// card
function PaketCard({ img, alt, type, price, title, size }: PaketItem) {
	return (
		<div className="max-w-[256px] md:max-w-[306px]">
			<div className="relative w-full aspect-[306/367] rounded-t-lg overflow-hidden">
				<Image
					src={img}
					alt={alt}
					fill
					loading="lazy"
					className="object-cover"
					sizes="(max-width: 768px) 100vw, 306px"
				/>
			</div>

			<div className="p-4 md:p-6 border-x border-b border-border-secondary rounded-b-lg bg-white space-y-4">
				<div className="space-y-3 border-b pb-2 px-1 border-border-secondary">
					<div className="flex gap-2 md:gap-4 text-2xl items-center">
						<span className="font-semibold bg-secondary text-secondary-foreground px-2.5 py-0.5 rounded-lg">
							{type}
						</span>
						<h2 className="font-bold text-[#0048B3] text-xl md:text-2xl">
							{FormatRupiah(price)}
						</h2>
					</div>
					<h3 className="text-lg md:text-xl font-bold">{title}</h3>
				</div>

				<div className="flex items-center gap-2 text-foreground-secondary text-sm">
					<SquaresExclude className="w-5 h-5 shrink-0" />
					{size}
				</div>

				<div className="flex justify-end gap-2.5">
					<Button variant="outline" asChild>
						<Link href={`/slug?slug=${title}`}>Details</Link>
					</Button>
					<Button className="btn-gradient">Order</Button>
				</div>
			</div>
		</div>
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
		title: "Full Container",
		size: "150 X 150 Cm",
	},
	{
		id: 3,
		img: PackImg3,
		alt: "Paket C Kemitraan Angkringan Cinta",
		type: "C",
		price: 7500000,
		title: "Full Container",
		size: "150 X 150 Cm",
	},
	{
		id: 4,
		img: PackImg4,
		alt: "Paket D Kemitraan Angkringan Cinta",
		type: "D",
		price: 6500000,
		title: "Full Container",
		size: "150 X 150 Cm",
	},
];
