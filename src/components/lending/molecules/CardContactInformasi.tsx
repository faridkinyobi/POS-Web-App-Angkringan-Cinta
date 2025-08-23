type Informasi = {
	icon: React.ReactNode;
	title: string;
	desc: string;
};
export default function CardContactInformasi({ icon, title, desc }: Informasi) {
	return (
		<div className="flex items-center gap-6">
			{/* icon */}
			<div className="size-8 bg-gradient rounded-sm flex items-center justify-center">
				{icon}
			</div>
			{/* desc */}
			<div>
				<h4 className="text-xl md:text-2xl font-medium">{title}</h4>
				<p className="text-sm md:text-base text-foreground-secondary font-medium">
					{desc}
				</p>
			</div>
		</div>
	);
}
