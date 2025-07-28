import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { MapPin, PhoneForwarded } from "lucide-react";

import logoAngkringan from "@/assets/logo.png";
import InstagramIcon from "@/assets/icon-instagram.svg";
import FacebookIcon from "@/assets/icon-facebook.svg";
import TiktokIcon from "@/assets/icon-tiktok.svg";

const socialLinks = [
	{ name: "Instagram", icon: InstagramIcon, href: "#" },
	{ name: "Facebook", icon: FacebookIcon, href: "#" },
	{ name: "Tiktok", icon: TiktokIcon, href: "#" },
];

export default function Footer() {
	return (
		<footer className="max-w-[90%] mx-auto py-10 space-y-6">
			<div className="flex flex-wrap justify-between gap-6">
				{/* Logo & Contact */}
				<section className="space-y-4 md:max-w-[328px]">
					<Image
						src={logoAngkringan}
						width={118}
						height={74}
						alt="Logo Angkringan Cinta"
						loading="lazy"
					/>
					<address className="not-italic space-y-2">
						<div className="flex gap-3 items-center">
							<div className="p-2 rounded-lg bg-primary">
								<PhoneForwarded
									size={24}
									className="text-secondary-foreground"
								/>
							</div>
							<p className="text-sm md:text-base text-card-foreground font-medium">
								0822-2673-2815
							</p>
						</div>
						<div className="flex gap-3 items-center">
							<div className="p-2 rounded-lg bg-primary">
								<MapPin size={24} className="text-secondary-foreground" />
							</div>
							<p className="text-sm md:text-base text-card-foreground font-medium">
								Jl. Mayor Achmadi 153, Candirejo Klumprit, Mojolaban, Sukoharjo,
								Jawa Tengah
							</p>
						</div>
					</address>
				</section>

				{/* Packages */}
				<nav aria-label="Packages" className="space-y-4">
					<h3 className="text-lg font-bold">Packages</h3>
					<ul className="space-y-2 text-base text-foreground-secondary font-medium">
						<li>Full Container</li>
						<li>Gerobak Container</li>
						<li>Semi Container Permanen</li>
						<li>Meja Container</li>
					</ul>
				</nav>

				{/* Help */}
				<nav aria-label="Help" className="space-y-4">
					<h3 className="text-lg font-bold">Help</h3>
					<ul className="space-y-2 text-base text-foreground-secondary">
						<li>
							<Link href="#">Contact</Link>
						</li>
						<li>
							<Link href="#">FAQ</Link>
						</li>
					</ul>
				</nav>

				{/* Social Media */}
				<section className="space-y-4">
					<CardSocialMedia {...socialLinks[0]} />
					<CardSocialMedia {...socialLinks[1]} />
					<CardSocialMedia {...socialLinks[2]} />
				</section>
			</div>

			<p className="text-center text-sm text-muted-foreground">
				&copy; 2025 Angkringan Cinta. All rights reserved.
			</p>
		</footer>
	);
}

type Props = {
	icon: StaticImageData;
	name: string;
	href: string;
};
function CardSocialMedia({ icon, name, href }: Props) {
	return (
		<div key={name} className="flex gap-3 items-center">
			<div className="p-2 bg-primary rounded-lg">
				<Image src={icon} width={24} height={24} alt={name} loading="lazy" />
			</div>
			<Link href={href} className="text-foreground-secondary" aria-label={name}>
				{name}
			</Link>
		</div>
	);
}
