"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Languages, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import useToggle from "@/lib/useToggle";

export default function NavbarLending() {
	const [isOpen, toggle] = useToggle({ initial: false });

	return (
		<nav className={` bg-white md:bg-transparent`}>
			<div className="relative z-20 flex items-center justify-between max-w-[90%] mx-auto">
				{/* LOGO */}
				<Image
					src={"/logo.png"}
					width={118}
					height={74}
					alt="Logo Angkringan Cinta"
					loading="lazy"
				/>

				{/* MENU */}
				<div
					className={`${
						isOpen
							? "absolute min-w-full md:min-w-fit z-0 left-0 top-full  bg-white md:bg-transparent md:static md:w-fit px-4 py-4"
							: "hidden top-0"
					} `}
				>
					<ul className="flex flex-col md:flex-row justify-between text-base font-medium text-foreground gap-6.5">
						<li>
							<Button
								asChild
								variant="ghost"
								className=" justify-start w-full md:w-fit"
							>
								<Link href="/">Home</Link>
							</Button>
						</li>
						<li>
							<Button
								asChild
								variant="ghost"
								className=" justify-start w-full md:w-fit"
							>
								<Link href="#">Services</Link>
							</Button>
						</li>
						<li>
							<Button
								asChild
								variant="ghost"
								className=" justify-start w-full md:w-fit"
							>
								<Link href="#">Packages</Link>
							</Button>
						</li>
						<li>
							<Button
								asChild
								variant="ghost"
								className=" justify-start w-full md:w-fit"
							>
								<Link href="#">Contacts</Link>
							</Button>
						</li>
						<li>
							<Button
								asChild
								variant="ghost"
								className=" justify-start w-full md:w-fit"
							>
								<Link href="#">FAQ</Link>
							</Button>
						</li>
					</ul>
				</div>

				{/* Toggle Button for Mobile */}
				<Button
					variant="ghost"
					size="default"
					className="md:hidden"
					onClick={toggle}
					aria-label="Open main navigation"
				>
					{isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
				</Button>

				{/* Translate Button */}
				<Button
					variant="outline"
					size="default"
					className="hidden md:block h-fit py-1.5 "
					aria-label="languages"
				>
					<Languages className=" size-3.5  md:size-6" />
				</Button>
			</div>
		</nav>
	);
}
