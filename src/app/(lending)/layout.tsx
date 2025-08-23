import Footer from "@/components/lending/organisms/Footer";
import NavbarLending from "@/components/lending/organisms/NavbarLending";
import React from "react";

export default function layoutLending({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<header>
				<NavbarLending />
			</header>
			<main className="min-h-screen max-w-[90%] mx-auto">{children}</main>
			<Footer />
		</>
	);
}
