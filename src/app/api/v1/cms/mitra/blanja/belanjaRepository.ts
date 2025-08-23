import { IzBlanjaMitra } from "@/schema";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const Create = async (data: IzBlanjaMitra) => {
	console.log(data)
	return await prisma.mitraBelanja.create({
		data: {
			metode_pay: data?.metode_pay,
			payment_status: data?.payment_status,
			grand_total: data?.grand_total,
			amount_paid: data?.amount_paid,
			order_code: `#${Math.floor(1000 + Math.random() * 9000)}ORD${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`,
			refund: data?.refund,
			note: data?.note ?? Prisma.JsonNull,
			mitra: {
				connect: { id: data?.mitra_id },
			},
			user: {
				connect: { id: data?.user_id },
			},

			DetailMitraBelanja: {
				create: data?.DetailMitraBelanja.map((item) => ({
					qty: item?.qty,
					harga: item?.harga,
					Subtotal: item?.Subtotal,
					masterInventory: {
						connect: { id: item?.id },
					},
				})),
			},
		},
		include: {
			mitra: true,
			user: true,
			DetailMitraBelanja: true,
		},
	})
};

export const getByKodeMitra = async (kode: string) => {
	return await prisma.mitra.findUnique({
		where: { kode_mitra: kode },
	});
};