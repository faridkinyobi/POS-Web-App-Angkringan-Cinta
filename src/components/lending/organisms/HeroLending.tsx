import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { CircleAccent } from "../molecules/AccentLending";
import HighlightCard from "../molecules/HighlightCard";
// import ArrowAccen from "@/assets/Arrow 2.svg";

export default function HeroLending() {
	return (
		<div className="py-6" aria-label="Statistik Kemitraan Angkringan Cinta">
			<div className="flex flex-col md:flex-row justify-between items-center">
				<div className="space-y-5">
					<h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center md:text-left">
						Nikmati Rasa Khas, Bangun Bisnis Cerdas –
						<span className="bg-gradient bg-clip-text text-transparent">
							Bersama Angkringan Cinta
						</span>
					</h1>
					{/* 1,000 ms */}
					<div className="flex flex-col md:flex-row items-start justify-between h-96 md:h-full ">
						<div className="relative w-48 lg:w-[340px] aspect-square">
							<Image
								src="/hero-2.avif"
								alt="angkringan cinta hero 2"
								width={340}
								height={340}
								quality={60}
								priority
								loading="eager"
								sizes="(max-width: 768px) 75vw, 340px"
								className="object-cover"
							/>
						</div>
						<CircleAccent />
					</div>
				</div>
				<div className="space-y-5 flex flex-col items-end h-96 md:h-full justify-end">
					<div className="relative w-48 lg:w-[340px] aspect-square">
						<Image
							src="/hero-1.png"
							alt="angkringan cinta hero 1"
							fill
							quality={60}
							loading="lazy"
							sizes="(max-width: 768px) 75vw, 340px"
							className="object-cover"
						/>
					</div>

					<div className="space-y-2.5 px-2">
						<p className=" text-sm md:text-base font-medium text-foreground-secondary ">
							<strong className="text-foreground">
								Peluang usaha modal kecil di kota maupun desa, cocok untuk semua
								kalangan.
							</strong>
							Mulai bisnismu sekarang dengan Angkringan Cinta.
						</p>
						<Button
							className="rounded-full btn-gradient"
							aria-label="Gabung Sekarang Kemitraan"
						>
							Gabung Sekarang
						</Button>
					</div>
				</div>
			</div>
			{/*  Highlight */}
			<div className="py-10 flex flex-col gap-10 md:gap-32">
				<div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 ">
					<h2 className="font-bold text-2xl md:text-4xl max-w-[615px] capitalize ">
						Bersama{" "}
						<span className="bg-gradient bg-clip-text text-transparent">
							Es Teh Angkringan Cinta
						</span>
						, Sukses Ada di Tangan Anda
					</h2>
					<p className="text-sm md:text-base max-w-[438px] text-foreground-secondary font-medium">
						Jutaan gelas es teh telah terjual, dan ratusan mitra telah
						membuktikan keuntungannya. Saatnya Anda menjadi bagian dari
						perjalanan sukses ini di seluruh Indonesia.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 border w-fit mx-auto gap-6">
					<HighlightCard number="100+" label="Mitra Bergabung" />
					<HighlightCard number="500.000+" label="Gelas Terjual" highlighted />
					<HighlightCard number="4+" label="Pengalaman" />
				</div>
			</div>
		</div>
	);
}
