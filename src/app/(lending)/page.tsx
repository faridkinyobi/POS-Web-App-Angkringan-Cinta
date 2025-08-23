import Hero from "@/components/lending/organisms/HeroLending";
import ServicesLending from "@/components/lending/organisms/ServicesLending";
import PackagesLending from "@/components/lending/organisms/PackagesLendingList";
import TestimoniLending from "@/components/lending/organisms/TestimoniLending";
import Contact from "@/components/lending/organisms/ContactLending";
import FAQ from "@/components/lending/organisms/FAQLending";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home",
};

export default function Home() {
	return (
		<>
			<Hero />
			<ServicesLending />
			<PackagesLending />
			<TestimoniLending />
			<Contact />
			<FAQ />
		</>
	);
}
