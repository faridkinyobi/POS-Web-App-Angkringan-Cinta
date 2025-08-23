// import { usePlaceOrder } from "@/stores/useBlanjaStore";
import { UserRound } from "lucide-react";

type CartDetail = {
	alamat: string;
	telepon: string;
	kode_mitra: string;
	nama: string;
};

export function CartMitraDetail({
	alamat,
	telepon,
	kode_mitra,
	nama,
}: CartDetail) {
	// const { isNext } = usePlaceOrder();
	// if (!isNext) return null;
	return (
		<div className="space-y-3 py-3 w-full">
			<div className="flex gap-5">
				<UserRound size={24} />
				<h4 className="capitalize text-lg font-semibold">Mitra Detail</h4>
			</div>
			<div className="space-y-2 text-base">
				<div className="flex justify-between items-center">
					<p className="font-medium text-foreground-secondary">id</p>
					<p className=" font-medium">{kode_mitra ?? "-"}</p>
				</div>
				<div className="flex justify-between items-center">
					<p className="font-medium text-foreground-secondary">Nama</p>
					<p className="font-medium">{nama ?? "-"}</p>
				</div>
				<div className="flex justify-between items-center">
					<p className="font-medium text-foreground-secondary">Telepon</p>
					<p className="font-medium">{telepon ?? "-"}</p>
				</div>
				<div className="flex justify-between items-center">
					<p className="font-medium text-foreground-secondary">Alamat</p>
					<p className="font-medium whitespace-normal break-words max-w-40">
						{alamat ?? "-"}
					</p>
				</div>
			</div>
		</div>
	);
}
