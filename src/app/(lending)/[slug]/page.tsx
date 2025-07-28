import Image from "next/image";
import React from "react";
import Img from "@/assets/paket-mitra-1.png";
export default function page() {
	return (
		<div className=" grid grid-cols-1 md:grid-cols-2 py-5">
			<div className="relative w-[286px] md:w-[406px]">
				<Image
					src={Img}
					alt={"alt"}
					width={406}
					height={467}
					loading="lazy"
					aria-label={"alt"}
					sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 406px"
					className=" rounded-b-lg"
				/>
			</div>
			<ul className="list-disc">
				<li>sddddddddddd</li>
				<li>sddddddddddd</li>
				<li>sddddddddddd</li>
				<li>sddddddddddd</li>
				<li>sddddddddddd</li>
				<li>sddddddddddd</li>
				<li>sddddddddddd</li>
				<li>sddddddddddd</li>
				<li>sddddddddddd</li>
				<li>sddddddddddd</li>
				<li>sddddddddddd</li>
				<li>sddddddddddd</li>
				<li>sddddddddddd</li>
				<li>sddddddddddd</li>
			</ul>
		</div>
	);
}
