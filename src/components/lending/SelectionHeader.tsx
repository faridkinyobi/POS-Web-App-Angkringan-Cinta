import React from "react";

type SelectionHeaderProps = {
	title: string;
	className: string;
};

export default function SelectionHeader({
	title,
	className,
}: SelectionHeaderProps) {
	return (
		<div className={`flex flex-col gap-2 py-2.5 md:py-5 ${className}`}>
			<h2 className="font-bold text-2xl md:text-4xl">{title}</h2>
			<div className="w-36 h-0.5 bg-accent-line rotate-2" />
		</div>
	);
}
