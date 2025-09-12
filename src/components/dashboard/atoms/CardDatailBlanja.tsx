"use client"
import { FormatRupiah } from "@/utils/formatRupiah";
import React from "react";

type Props = { title: string; harga: number; qty: number };

export default function CardDatailBlanja({ title, harga, qty }: Props) {
	return (
		<div className="flex justify-between">
			<div className="space-y-1">
				<strong className="text-lg print:text-base">{title}</strong>
				<p className="text-sm font-medium gap-3 print:font-normal flex flex-row">
					{qty} x
					<span className="text-foreground-secondary">
						{FormatRupiah(harga)}
					</span>
				</p>
			</div>
			<p className="text-foreground-secondary text-base font-medium print:text-sm print:font-normal">
				{FormatRupiah(qty * harga)}
			</p>
		</div>
	);
}
