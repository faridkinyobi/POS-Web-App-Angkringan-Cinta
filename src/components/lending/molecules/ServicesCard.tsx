export default function ServicesCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<div className="bg-card rounded-lg p-5 flex flex-col items-center max-w-[333px] text-center gap-4">
			{icon}
			<div className="space-y-2">
				<h3 className="text-2xl md:text-3xl font-semibold">{title}</h3>
				<p className="text-sm md:text-base text-card-foreground font-medium text-pretty">
					{description}
				</p>
			</div>
		</div>
	);
}
