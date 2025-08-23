import React from "react";

// assets
import TestimoniImg from "@/assets/testimoni mitra 1.webp";
import TestimoniImg2 from "@/assets/testimoni mitra 2.webp";
import TestimoniImg3 from "@/assets/testimoni mitra 3.webp";
import CardTestimoni, { TestimoniProps } from "../molecules/CardTestimoni";

export default function TestimoniLending() {
	return (
		<section className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center py-5 gap-9">
			{/* Teks Pembuka */}
			<div className="space-y-4 max-w-[520px]">
				<h2 className="font-bold text-3xl md:text-4xl capitalize">
					Sudah Ratusan Mitra Bergabung Bersama Kami
				</h2>
				<p className="text-sm md:text-base text-foreground-secondary font-medium">
					Jutaan gelas sudah terjual dan ratusan mitra telah merasakan manisnya
					keuntungan. Mari bergabung dan jadi bagian dari kisah sukses kami di
					seluruh Indonesia.
				</p>
			</div>

			{/* Daftar Testimoni */}
			<div className="max-w-[433px] space-y-3.5 md:space-y-6">
				{testimoniData.map((items, i) => (
					<CardTestimoni key={i} {...items} />
				))}
			</div>
		</section>
	);
}

// type Testimoni = {
// 	image: StaticImageData | string;
// 	name: string;
// 	desc: string;
// 	alamat: string;
// };

// function CardTestimoni({ image, name, desc, alamat }: Testimoni) {
// 	return (
// 		<div className="flex items-center gap-5 bg-card md:py-4 py-2 px-2.5 md:px-5 border-l-[3px] border-primary rounded-lg">
// 			<Dialog>
// 				<DialogTrigger asChild>
// 					<button
// 						type="button"
// 						aria-label={`Buka preview foto testimoni ${name}`}
// 						className="focus:outline-none"
// 					>
// 						<div className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden transition-transform duration-200 hover:scale-105 cursor-pointer">
// 							<Image
// 								src={image}
// 								alt={`Image testimoni ${name}`}
// 								width={100}
// 								height={100}
// 								loading="lazy"
// 								className="object-cover w-full h-full"
// 							/>
// 						</div>
// 					</button>
// 				</DialogTrigger>

// 				<DialogContent className="w-full max-w-md p-0 overflow-hidden">
// 					<DialogTitle className="sr-only">
// 						Preview foto testimoni {name}
// 					</DialogTitle>
// 					<DialogDescription className="sr-only">
// 						Gambar testimoni mitra bername {name} dari {alamat}
// 					</DialogDescription>
// 					<Image
// 						src={image}
// 						alt={`Preview testimoni ${name}`}
// 						width={600}
// 						height={600}
// 						loading="lazy"
// 						className="w-full h-auto object-cover"
// 					/>
// 				</DialogContent>
// 			</Dialog>

// 			{/* Info Name dan Testimoni */}
// 			<div className="space-y-2">
// 				<p className="text-base font-semibold leading-tight">
// 					{name}
// 					<span className="ml-2 text-sm md:text-base text-muted-foreground">
// 						{alamat}
// 					</span>
// 				</p>
// 				<p className="text-sm md:text-base text-foreground-secondary leading-relaxed">
// 					{desc}
// 				</p>
// 			</div>
// 		</div>
// 	);
// }

const testimoniData: TestimoniProps[] = [
	{
		image: TestimoniImg,
		name: "Anita",
		desc: "Sangat terbantu dengan sistem franchise-nya. Training lengkap, dukungan pusat luar biasa!",
		alamat: "Surabaya",
	},
	{
		image: TestimoniImg2,
		name: "Budi",
		desc: "Penjualan stabil dan dibantu promosi dari pusat. Recommended banget untuk pemula.",
		alamat: "Jogja",
	},
	{
		image: TestimoniImg3,
		name: "Citra",
		desc: "Modal kecil, tapi hasil maksimal! Customer suka rasa es tehnya, repeat order terus.",
		alamat: "Bandung",
	},
];
