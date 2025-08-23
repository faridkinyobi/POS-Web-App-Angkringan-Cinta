"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import "./globals.css";

export default function GlobalError() {
	return (
		<html lang="en">
			<body>
				<div className="flex flex-col items-center justify-center text-center min-h-screen">
					<h2 className="text-3xl font-semibold mb-2">Something went wrong!</h2>
					<p className="text-gray-500 max-w-md mb-6">
						Kami sedang mengalami kendala. Silakan coba beberapa saat lagi atau
						kembali ke halaman utama.
					</p>
					<Button
						onClick={() => {
							// refresh the page
							window.location.reload();
						}}
					>
						Refresh
					</Button>
				</div>
			</body>
		</html>
	);
}
