"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useToggle from "@/hooks/useToggle";

export default function NavbarLending() {
	const [isOpen, toggle] = useToggle({ initialValue: false });

	return (
		<nav className="bg-white md:bg-transparent w-full shadow-sm md:shadow-none">
			<div className="relative z-20 flex items-center justify-between max-w-[90%] mx-auto">
				{/* Logo */}
				<Link href="/" aria-label="Homepage" className="border-none outline-0">
					<Image
						src="/logo.png"
						width={118}
						height={74}
						alt="Logo Angkringan Cinta"
						loading="lazy"
						className="h-auto w-auto"
					/>
				</Link>

				{/* Desktop Menu */}
				<ul className="hidden md:flex gap-6 text-base font-medium text-foreground">
					{navLinks.map(({ label, href }) => (
						<li key={href}>
							<Button asChild variant="ghost" className="text-base">
								<Link href={href}>{label}</Link>
							</Button>
						</li>
					))}
				</ul>

				{/* Language Switcher */}
				<div className="md:flex items-center hidden  h-fit ">
					<Button
						variant="ghost"
						size="default"
						className="cursor-pointer"
						aria-label="language selector"
					>
						EN
					</Button>
					<span className="text-muted-foreground">|</span>
					<Button
						variant="ghost"
						size="default"
						className="cursor-pointer"
						aria-label="language selector"
					>
						ID
					</Button>
				</div>

				{/* Mobile Toggle */}
				<Button
					variant="ghost"
					size="icon"
					className="md:hidden"
					onClick={toggle}
					aria-label="Open main menu"
				>
					{isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
				</Button>
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<div className="md:hidden absolute top-16.5 left-0 w-full bg-white shadow-md z-10 px-4 py-6">
					<ul className="flex flex-col gap-4">
						{navLinks.map(({ label, href }) => (
							<li key={href}>
								<Button
									asChild
									variant="ghost"
									className="w-full justify-start"
									onClick={toggle}
								>
									<Link href={href}>{label}</Link>
								</Button>
							</li>
						))}
					</ul>
					<div className="flex items-center md:hidden my-3 ">
						<Button
							variant="ghost"
							size="default"
							className="cursor-pointer"
							aria-label="language selector"
						>
							EN
						</Button>
						<span className="text-muted-foreground">|</span>
						<Button
							variant="ghost"
							size="default"
							className="cursor-pointer"
							aria-label="language selector"
						>
							ID
						</Button>
					</div>
				</div>
			)}
		</nav>
	);
}
const navLinks = [
	{ label: "Home", href: "/" },
	{ label: "Services", href: "#services" },
	{ label: "Packages", href: "#packages" },
	{ label: "Contacts", href: "#contacts" },
	{ label: "FAQ", href: "#faq" },
];
