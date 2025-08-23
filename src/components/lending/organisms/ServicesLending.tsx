import { ChefHat, HandCoins } from "lucide-react";
import React from "react";
import Image from "next/image";

import ServicesImg from "@/assets/services-img.png";
import SelectionHeader from "../molecules/SelectionHeader";
import ServicesCard from "../molecules/ServicesCard";

export default function ServicesLending() {
	return (
		<section className="py-5 flex flex-col justify-center items-center space-y-5 md:space-y-0">
			<SelectionHeader
				title="Service"
				className="items-center md:items-start"
			/>
			<div className=" flex flex-col md:flex-row justify-center items-center md:items-end gap-5 w-full">
				<Image
					src={ServicesImg}
					alt="Ilustrasi layanan angkringan cinta"
					width={416}
					height={553}
					loading="lazy"
					className="object-cover rounded-lg w-[190px] md:w-full max-w-[416px] aspect-[416/553]"
					sizes="(max-width: 768px) 100vw, 416px"
				/>
				<div className="flex flex-wrap justify-center gap-6 lg:gap-11 w-full">
					{services.map((service, i) => (
						<ServicesCard
							key={i}
							icon={service.icon}
							title={service.title}
							description={service.description}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

const services = [
	{
		icon: (
			<HandCoins
				strokeWidth={0.9}
				className="size-24 md:size-32 bg-gradient text-secondary-foreground rounded-full"
			/>
		),
		title: "Modal Terjangkau, Potensi Cuan Besar",
		description:
			"Ini dia kesempatan emas Anda! Mulai usaha esteh dengan modal ringan, potensi keuntungan besar menanti di depan mata.",
	},
	{
		icon: (
			<ChefHat
				strokeWidth={0.9}
				className="size-24 md:size-32 bg-gradient text-secondary-foreground rounded-full"
			/>
		),
		title: "Cita Rasa Khas yang Tak Tertandingi",
		description:
			"Resep esteh istimewa kami teruji disukai banyak orang. Kualitas dan kelezatan yang akan membuat pelanggan Anda selalu kembali.",
	},
];
