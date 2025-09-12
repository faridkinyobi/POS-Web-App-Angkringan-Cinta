"use client";
import React from "react";
import InformationMitra from "../atoms/InformationMitra";
import InformationTransaksi from "../atoms/InformationTransaksi";
import DetailBlanjaList from "../molecules/DetailBlanjaList";
import DetailSummery from "../atoms/DetailSummery";

type Props = {
	data?: any;
	className?: string;

};

export default function DetailTransaksi({ data, className }: Props) {

	const datas = data?.data || data

	return (
		<div
			className={`grid grid-cols-1 gap-3 print:grid-cols-1 print:gap-1.5 ${className}`}
		>
			<div className="grid grid-cols-1 gap-3 print:gap-1.5">
				<InformationMitra
					title="Mitra Information"
					Name={datas?.mitra?.nama ?? "-"}
					id={datas?.mitra?.kode_mitra ?? "-"}
					Telefon={datas.mitra?.telepon ?? "-"}
				/>
				<InformationTransaksi
					title=" Transaksi Information"
					Date="22222"
					Officer={datas?.user?.name ?? "-"}
					Status={datas?.payment_status ?? "-"}
				/>
			</div>
			<div className="grid grid-cols-1 gap-3 print:gap-1.5">
				<DetailBlanjaList data={data.DetailMitraBelanja ?? datas.DetailMitraBelanja} />
				<DetailSummery
					amount_paid={datas?.amount_paid ?? "-"}
					grandTotal={datas?.grand_total ?? "-"}
					subTotal={datas?.subTotal ?? "-"}
					refund={datas?.refund ?? "-"}
				/>
			</div>
		</div>
	);
}
