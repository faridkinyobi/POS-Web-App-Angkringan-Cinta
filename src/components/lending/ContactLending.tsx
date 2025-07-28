import React from "react";
import SelectionHeader from "./SelectionHeader";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Mail, MapPin, PhoneForwarded } from "lucide-react";
import { Textarea } from "../ui/textarea";

export default function Contact() {
	return (
		<section className=" space-y-3 md:space-y-9">
			<SelectionHeader
				title="Contacts Me"
				className=" justify-center items-center"
			/>
			<div className=" flex flex-col lg:flex-row justify-between items-center space-y-10">
				{/* informasi */}
				<div className="space-y-5 max-w-[656px]">
					<div className="space-y-5.5">
						<h3 className="font-bold text-2xl md:text-3xl">
							Ayo Jadi Mitra Sekarang
						</h3>
						<p className="text-sm md:text-base text-foreground-secondary font-medium">
							Jangan lewatkan kesempatan terbatas ini! Bangun bisnis minuman
							kekinian dengan Angkringan Cinta. sekarang juga
						</p>
					</div>
					<div className="px-5 space-y-4">
						{ContactInformasi.map((items, i) => (
							<CardContactInformasi key={i} {...items} />
						))}
					</div>
				</div>
				{/* form */}
				<div className=" bg-card p-5 md:p-10 w-full md:max-w-[505px] space-y-4.5 md:space-y-9 rounded-lg flex-1">
					<p className="text-xl md:text-2xl font-semibold text-center">
						Kirim Pesan
					</p>
					<form className="gap-y-5 flex flex-col justify-end">
						<div className="space-y-3 font-medium">
							<div className="flex flex-col gap-2">
								<label htmlFor="nama">Nama</label>
								<Input
									type="text"
									placeholder="Masukkan nama anda"
									name="Nama"
									required
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="Email">Email</label>
								<Input
									type="email"
									placeholder="Masukkan email anda"
									name="email"
									required
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="Nama">Pesan</label>
								<Textarea placeholder="Masukkan Pesan" />
							</div>
						</div>
						<Button
							type="button"
							variant={"default"}
							size={"default"}
							className="btn-gradient"
						>
							Submite
						</Button>
					</form>
				</div>
			</div>
		</section>
	);
}
type Informasi = {
	icon: React.ReactNode;
	title: string;
	desc: string;
};
function CardContactInformasi({ icon, title, desc }: Informasi) {
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

const ContactInformasi: Informasi[] = [
	{
		icon: <MapPin size={24} className="text-secondary-foreground " />,
		title: "Address",
		desc: " Jl. Mayor Achmadi 153 Candirejo Klumprit, Mojolaban, Sukoharjo, Jawa Tengah",
	},
	{
		icon: <PhoneForwarded size={24} className="text-secondary-foreground" />,
		title: "Phone Number",
		desc: "0822-2673-2815",
	},
	{
		icon: <Mail size={24} className="text-secondary-foreground " />,
		title: "Email",
		desc: "angkringanCinta@gmail.com",
	},
];
