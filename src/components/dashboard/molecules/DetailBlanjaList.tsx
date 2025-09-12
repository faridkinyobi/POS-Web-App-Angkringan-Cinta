"use client"
import React from "react";
import CardDatailBlanja from "../atoms/CardDatailBlanja";
import { ChevronDown } from "lucide-react";
import useToggle from "@/hooks/useToggle";

type DetailMitraBelanjaItem = {
	qty: number;
	harga: string;
	masterInventory: {
		name: string;
	};
};

type Props = {
	data: DetailMitraBelanjaItem[];
};

export default function DetailBlanjaList({ data }: Props) {
	const [isOpen, tonggle] = useToggle({ initialValue: false });

	if (!data) return <p>Tidak ada data transaksi</p>;

	return (
		<div>
			<div className="flex justify-between border-b border-b-accent-line border-dashed">
				<p className="capitalize text-base font-semibold py-2 print:py-1 print:text-sm print:font-medium">
					Transaksi Detail
				</p>
				<span onClick={tonggle} className="cursor-pointer print:hidden">
					{isOpen ? <ChevronDown /> : <ChevronDown />}
				</span>
			</div>
			<div
				className={`py-2 px-3 space-y-1 border-b border-b-accent-line print:px-0 print:py-1 ${isOpen ? "hidden print:block" : "print:block"}`}
			>
				{data?.map((items, index) => (
					<CardDatailBlanja
						key={index}
						title={items.masterInventory.name ?? '-'}
						qty={items.qty ?? 0}
						harga={Number(items.harga ?? 0)}
					/>
				))}
			</div>
		</div>
	);
}
