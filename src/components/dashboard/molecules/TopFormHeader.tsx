"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
interface TopFormHeaderProps {
	label: string;
}
export default function TopFormHeader({ label }: TopFormHeaderProps) {
	const router = useRouter();

	return (
		<div className="py-5 px-3 border-b border-b-border-secondary">
			<div
				className="flex gap-2.5 items-center cursor-pointer font-bold text-base w-fit"
				onClick={() => router.back()}
			>
				<ArrowLeft />
				<span>{label}</span>
			</div>
		</div>
	);
}
