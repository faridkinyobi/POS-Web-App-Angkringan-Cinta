"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { useUpdateStatusTransaksiBlanja } from "@/features";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { FormatRupiah } from "@/utils/formatRupiah";
import { IzAmountPaid, SchemaAmountPaid } from "@/schema";
import { useFormModalStore } from "@/stores";
import { DialogFooter } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

export default function FormAmountPaid({ id = "" }: { id?: string }) {
	const { close } = useFormModalStore();

	const form = useForm<IzAmountPaid>({
		resolver: zodResolver(SchemaAmountPaid) as any,
		mode: "onTouched",
		defaultValues: {
			amount_paid: 0,
		},
	});
	const { control, handleSubmit, setValue, watch } = form;

	// QUERY
	const { mutate, isPending } = useUpdateStatusTransaksiBlanja();

	// console.log(typeof getValues("harga_beli"));
	const onSubmit = (data: IzAmountPaid) => {
		const payload = { id: id, amount_paid: data.amount_paid };
		mutate(payload);
		close();
	};

	const amount_paid = watch("amount_paid");

	const formatCurrency = (raw: string) => {
		const number = Number(raw.replace(/\D/g, ""));
		return raw ? FormatRupiah(number) : "";
	};

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit, (Error) =>
					console.log("errror", Error)
				)}
				className="grid grid-cols-1 gap-12.5 px-6 py-10"
			>
				<FormField
					control={control}
					name="amount_paid"
					render={() => (
						<FormItem>
							<FormLabel>Amount paid</FormLabel>
							<FormControl>
								<Input
									placeholder="Input jumlah yang di bayar"
									type="text"
									value={formatCurrency(String(amount_paid))}
									onChange={(e) => {
										const raw = e.target.value;
										const num = Number(raw.replace(/\D/g, ""));
										setValue("amount_paid", num, { shouldValidate: true });
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="outline" formNoValidate>
							Cancel
						</Button>
					</DialogClose>
					<Button
						type="submit"
						disabled={isPending}
						className="cursor-pointer "
					>
						Save
						{isPending && <LoaderCircle className="animate-spin" />}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
