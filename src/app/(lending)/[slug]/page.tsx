"use client";
import React from "react";
import Image from "next/image";
import Img from "@/assets/paket-mitra-1.png";
import { notFound, useSearchParams } from "next/navigation";

const paketData = {
	"Full-Container": {
		title: "Full Container",
	},
	"Gerobak-Container": {
		title: "Gerobak Container",
	},
	"Semi-Con-Permanen": {
		title: "Semi-Con Permanen",
	},
	"Meja-Container": {
		title: "Meja Container",
	},
};

type PaketKey = keyof typeof paketData;

export default function Page() {
	const searchParams = useSearchParams();
	const title = searchParams.get("title") || "";
	const data = paketData[title as PaketKey];

	if (!data) {
		notFound();
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 py-5 gap-6">
			<div>
				<h1 className="text-3xl font-bold mb-4">
					Paket: {data.title.replace(/\s+/g, " ")}
				</h1>
				<ul className="list-disc ml-5 space-y-1">
					<li>Isi kemitraan lengkap</li>
					<li>Peralatan siap pakai</li>
					<li>Gratis training dan support</li>
					<li>Bahan baku awal</li>
					<li>Dukungan branding</li>
				</ul>
			</div>
			<div className="relative w-[286px] md:w-[406px]">
				<Image
					src={Img}
					alt={data.title}
					width={406}
					height={467}
					loading="lazy"
					className="rounded-b-lg object-cover"
				/>
			</div>
		</div>
	);
}
