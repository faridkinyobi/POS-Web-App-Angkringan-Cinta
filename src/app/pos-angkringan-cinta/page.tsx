"use client";

import AuthForm from "@/components/dashboard/organisms/FormOrganisms/FormAuth";
import React from "react";
import ImageBg from "@/assets/loginImg.png";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Page() {
	return (
		<div className="flex flex-wrap min-h-screen w-screen">
			{/* Kolom Gambar */}
			<div
				className="hidden md:hidden lg:block w-full lg:w-1/2 aspect-[3/4] lg:h-screen bg-cover bg-center"
				style={{
					backgroundImage: `url(${ImageBg.src})`,
				}}
			/>

			{/* Kolom Form */}
			<div className=" max-w-[573px] flex justify-between items-center mx-auto ">
				<Card>
					<CardHeader>
						<Image
							src="/logo.png"
							width={217}
							height={106}
							alt="Logo Angkringan Cinta"
							priority
							className="h-auto w-auto"
						/>
						<div className="max-w-[541px] space-y-4">
							<CardTitle>Welcome to Angkringan Cinta</CardTitle>
							<CardDescription>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor
							</CardDescription>
						</div>
					</CardHeader>
					<CardContent>
						<AuthForm />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
