"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CartMitraDetail } from "../../atoms/CartMitraDetail";
import { Controller, useForm } from "react-hook-form";
import { IzBlanjaMitra, SchemaBlanjaMitra } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddBlanjaMitra, useKodeMitra } from "@/features";
import React from "react";
import { useBlanjaStore, usePlaceOrder } from "@/stores/useBlanjaStore";
import { CartSummary } from "../../atoms/CartSummary";
import { FormatRupiah } from "@/utils/formatRupiah";

export function OrderForm() {
	const [searchMitra, setSearchMitra] = React.useState("");
	const { items, grandTotal, subTotal } = useBlanjaStore();
	const { toggle } = usePlaceOrder();

	const form = useForm<IzBlanjaMitra>({
		resolver: zodResolver(SchemaBlanjaMitra) as any,
		defaultValues: {
			metode_pay: "tunai",
			payment_status: "pending",
			grand_total: 0,
			amount_paid: 0,
			refund: 0,
			note: "",
			DetailMitraBelanja: [],
			mitra_id: "",
		},
	});

	const {
		control,
		reset,
		handleSubmit,
		register,
		getValues,
		setValue,
		watch,
		formState: { errors },
	} = form;

	const { data } = useKodeMitra(searchMitra.trim());
	const amount_paid = watch("amount_paid");

	const defaultValues = React.useMemo(() => {
		return {
			mitra_id: data?.id ?? "",
			DetailMitraBelanja: items,
			grand_total: Number(grandTotal),
		};
	}, [data?.id, items, grandTotal]);

	React.useEffect(() => {
		return reset({
			...form.getValues(),
			...defaultValues,
			refund: amount_paid - grandTotal,
		});
	}, [defaultValues, reset]);

	React.useEffect(() => {
		// Update refund realtime kalau amount_paid berubah
		setValue("refund", amount_paid - grandTotal, { shouldValidate: true });
	}, [amount_paid, grandTotal, setValue]);

	const formatCurrency = (raw: string) => {
		const number = Number(raw.replace(/\D/g, ""));
		return raw ? FormatRupiah(number) : "";
	};

	// handle add data blanja
	const { mutate } = useAddBlanjaMitra();

	const onSubmit = (data: IzBlanjaMitra) => mutate(data);
	// console.log(form.getValues());
	return (
		<form
			onSubmit={handleSubmit(onSubmit, (Error) => console.log("errror", Error))}
		>
			<div className="flex flex-col gap-10 h-full">
				<div className="space-y-3">
					<Label>Id Mitra</Label>
					<Input
						placeholder="Input id mitra"
						value={searchMitra}
						// {...register("mitra_id")}
						onChange={(e) => setSearchMitra(e.target.value)}
					/>
					<p className="text-destructive text-sm md:text-base">
						{errors.mitra_id?.message}
					</p>
				</div>
				<CartMitraDetail {...data} />
				{/* Note*/}
				<div className="space-y-3">
					<Label>Note</Label>
					<Textarea placeholder="Input Note" {...register("note")} />
					<p className="text-destructive text-sm md:text-base">
						{errors.note?.message}
					</p>
				</div>
				{/* metode_pay */}
				<div className="w-full flex gap-4">
					<Button
						type="button"
						className="w-full flex-1"
						variant={
							getValues("metode_pay") !== "transfer" ? "default" : "outline"
						}
						onClick={() => reset({ ...form.getValues(), metode_pay: "tunai" })}
					>
						Case
					</Button>
					<Button
						type="button"
						variant={
							getValues("metode_pay") === "transfer" ? "default" : "outline"
						}
						className="w-full flex-1"
						onClick={() =>
							reset({ ...form.getValues(), metode_pay: "transfer" })
						}
					>
						Transfer
					</Button>
				</div>
				{/* amount_paid */}
				{getValues("metode_pay") === "tunai" && (
					<div className="space-y-3">
						<Label>Pembayaran</Label>
						<Controller
							control={control}
							name="amount_paid"
							render={({ field }) => (
								<Input
									placeholder="Input nominal"
									value={formatCurrency(String(field.value || 0))}
									onChange={(e) => {
										const raw = e.target.value;
										const num = Number(raw.replace(/\D/g, "")); // hanya angka
										field.onChange(num);
									}}
								/>
							)}
						/>
						<p className="text-destructive text-sm md:text-base">
							{errors.amount_paid?.message}
						</p>
					</div>
				)}
				{/* Summary */}
				<CartSummary
					subTotal={subTotal}
					grandTotal={grandTotal}
					refund={getValues("refund")}
					amount_paid={getValues("amount_paid")}
				/>
			</div>
			<div className="space-y-4.5">
				<Button className="w-full cursor-pointer" type="submit">
					Continue to Payment
				</Button>
				<Button
					className="w-full"
					variant={"outline"}
					type="button"
					onClick={() => toggle()}
				>
					Cansel
				</Button>
			</div>
		</form>
	);
}
