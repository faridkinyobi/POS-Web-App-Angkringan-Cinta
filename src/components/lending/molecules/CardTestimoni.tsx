import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Image, { StaticImageData } from "next/image";

export type TestimoniProps = {
	image: StaticImageData;
	name: string;
	desc: string;
	alamat: string;
};

export default function CardTestimoni({
	image,
	name,
	desc,
	alamat,
}: TestimoniProps) {
	return (
		<div className="flex items-center gap-5 bg-card md:py-4 py-2 px-2.5 md:px-5 border-l-[3px] border-primary rounded-lg">
			<Dialog>
				<DialogTrigger asChild>
					<button
						type="button"
						aria-label={`Buka preview foto testimoni ${name}`}
						className="focus:outline-none"
					>
						<div className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden transition-transform duration-200 hover:scale-105 cursor-pointer">
							<Image
								src={image}
								alt={`Image testimoni ${name}`}
								width={100}
								height={100}
								loading="lazy"
								className="object-cover w-full h-full"
							/>
						</div>
					</button>
				</DialogTrigger>

				<DialogContent className="w-full max-w-md p-0 overflow-hidden">
					<DialogTitle className="sr-only">
						Preview foto testimoni {name}
					</DialogTitle>
					<DialogDescription className="sr-only">
						Gambar testimoni mitra bername {name} dari {alamat}
					</DialogDescription>
					<Image
						src={image}
						alt={`Preview testimoni ${name}`}
						width={600}
						height={600}
						loading="lazy"
						className="w-full h-auto object-cover"
					/>
				</DialogContent>
			</Dialog>

			{/* Info Name dan Testimoni */}
			<div className="space-y-2">
				<p className="text-base font-semibold leading-tight">
					{name}
					<span className="ml-2 text-sm md:text-base text-muted-foreground">
						{alamat}
					</span>
				</p>
				<p className="text-sm md:text-base text-foreground-secondary leading-relaxed">
					{desc}
				</p>
			</div>
		</div>
	);
}
