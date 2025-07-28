import Hero from "@/components/lending/HeroLending";
import ServicesLending from "@/components/lending/ServicesLending";
import PackagesLending from "@/components/lending/PackagesLendingList";
import TestimoniLending from "@/components/lending/TestimoniLending";
import Contact from "@/components/lending/ContactLending";
import FAQ from "@/components/lending/FAQLending";

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
