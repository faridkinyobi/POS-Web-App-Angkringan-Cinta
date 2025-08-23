import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-center bg-background">
			<h1 className="text-4xl font-bold text-primary mb-2">
				404 - Halaman Tidak Ditemukan
			</h1>
			<p className="text-muted-foreground mb-6">
				Hmm... sepertinya kamu nyasar. Coba balik ke jalan yang benar ya 😄
			</p>
			<Button asChild variant={"default"}>
				<Link href="/">Kembali ke Beranda</Link>
			</Button>
		</div>
	);
}
