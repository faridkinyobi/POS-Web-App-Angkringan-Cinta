import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import React from "react";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import { AlertDialogProvider } from "@/components/dashboard/organisms";

const JakartaSans = localFont({
	src: "./fonts/PlusJakartaSans-VariableFont_wght.ttf",
	variable: "--Plus-Jakarta-Sans",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: {
		default: "Angkringan Cinta",
		template: "%s | Angkringan Cinta",
	},
	description: "Nikmati rasa khas dan peluang bisnis bersama Angkringan Cinta.",
};
// Cari usaha modal kecil di desa atau kota? Temukan peluang bisnis menguntungkan dengan produk yang disukai semua kalangan. Mulai sekarang dan raih sukses bersama kami!

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Head>
				<link rel="preload" as="image" href="/hero-1.png" type="image/png" />
				<link rel="preload" as="image" href="/hero-2.avif" type="image/avif" />
				<link rel="preload" as="image" href="/logo.png" />
			</Head>
			<body
				className={`${JakartaSans.className} bg-background text-foreground antialiased`}
			>
				<NextTopLoader color="#16610E" />
				<ToastContainer />

				<ReactQueryProvider>{children}</ReactQueryProvider>
				<AlertDialogProvider />
			</body>
		</html>
	);
}
