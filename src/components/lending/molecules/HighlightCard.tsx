export default function HighlightCard({
	number,
	label,
	highlighted = false,
}: {
	number: string;
	label: string;
	highlighted?: boolean;
}) {
	const baseStyle = "py-1 px-2 md:py-2 md:px-3 text-center w-[196px]";
	const textStyle = "font-bold text-2xl";
	const labelStyle = "uppercase text-base font-semibold";

	return (
		<div
			className={`${baseStyle} ${
				highlighted ? "bg-gradient text-white" : "bg-background"
			} `}
		>
			<p className={textStyle}>{number}</p>
			<p className={labelStyle}>{label}</p>
		</div>
	);
}
