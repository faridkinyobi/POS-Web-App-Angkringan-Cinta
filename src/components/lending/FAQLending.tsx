import React from "react";
import SelectionHeader from "./SelectionHeader";
import ImgFAQ from "@/assets/Es Teh Angkringan Cintar.png";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";
import Image from "next/image";

export default function FAQ() {
	return (
		<section className="py-5 space-y-5 md:space-y-8">
			<SelectionHeader title="FAQ" className="items-center justify-center " />
			<div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 ">
				<h3 className="font-bold text-3xl md:text-4xl max-w-[615px]">
					Ada Pertanyaan? kami siap membantu
				</h3>
				<p className="text-sm md:text-base max-w-[438px] text-foreground-secondary font-medium">
					Temukan jawaban dari berbagai pertanyaan yang sering ditanyakan
					seputar kemitraan, produk, dan cara bergabung dengan Angkringan Cinta.
					Kami berkomitmen untuk memberikan informasi yang jelas dan dukungan
					penuh bagi Anda yang ingin memulai usaha bersama kami.
				</p>
			</div>

			<div className="flex flex-col md:flex-row justify-between items-center space-y-3 py-3">
				<Image
					src={ImgFAQ}
					alt="Es Teh Angkringan Cintar"
					loading="lazy"
					width={440}
					height={553}
					sizes="(max-width: 640px) 200px, (max-width: 768px) 300px, 416px"
					className="object-cover rounded-lg w-[200px] md:w-full max-w-[416px] aspect-[416/553]"
				/>
				<Accordion
					type="single"
					collapsible
					className="w-full max-w-[661px]"
					defaultValue="item-1"
				>
					{faqList.map((item, index) => (
						<FaqItem key={index} value={`item-${index + 1}`} {...item} />
					))}
				</Accordion>
			</div>
		</section>
	);
}
type FaqProps = {
	question: string;
	answer: string;
	value: string;
};

function FaqItem({ question, answer, value }: FaqProps) {
	return (
		<AccordionItem value={value}>
			<AccordionTrigger>
				<h4>{question}</h4>
			</AccordionTrigger>
			<AccordionContent className="flex flex-col gap-4 text-balance">
				<p>{answer}</p>
			</AccordionContent>
		</AccordionItem>
	);
}
const faqList: Omit<FaqProps, "value">[] = [
	{
		question: "Berapa modal awal untuk bergabung?",
		answer:
			"Modal awal untuk bergabung sebagai mitra dimulai dari Rp 6.500.000, tergantung paket kemitraan yang Anda pilih. Setiap paket dirancang agar Anda dapat langsung memulai usaha dengan perlengkapan dan bahan awal.",
	},
	{
		question: "Apakah mitra akan mendapatkan pelatihan?",
		answer:
			"Ya. Mitra akan mendapatkan pelatihan lengkap dari tim pusat, termasuk cara penyajian, manajemen operasional, dan strategi pemasaran.",
	},
	{
		question: "Bagaimana sistem pembelian bahan baku?",
		answer:
			"Bahan baku dapat dipesan langsung dari pusat dengan sistem pemesanan yang mudah dan harga khusus untuk mitra.",
	},
	{
		question: "Apakah ada biaya royalti bulanan?",
		answer:
			"Tidak ada biaya royalti bulanan. Mitra hanya membayar di awal saat pembelian paket kemitraan.",
	},
	{
		question: "Apakah bisa memilih lokasi usaha sendiri?",
		answer:
			"Ya, mitra bebas menentukan lokasi usaha selama tidak melanggar ketentuan wilayah eksklusif mitra lain.",
	},
];
