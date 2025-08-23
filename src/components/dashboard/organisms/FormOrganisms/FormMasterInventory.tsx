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
import {
	useEditMasterInventory,
	useGetByIdMasterInventory,
	useAddMasterInventory,
} from "@/features";
import { IzMasterInventory, SchemaMasterInventory } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { DataSelect } from "../../molecules";
import { FormatRupiah } from "@/utils/formatRupiah";

export default function FormMasterInventory({ id = "" }: { id?: string }) {
	const { data } = useGetByIdMasterInventory(id);
	const defaultValues = React.useMemo(
		() => ({
			name: "",
			stock: 0,
			satuan: "",
			katagory: "",
			harga_beli: 0,
			harga_jual: 0,
		}),
		[]
	);

	const form = useForm<IzMasterInventory>({
		resolver: zodResolver(SchemaMasterInventory) as any,
		mode: "onTouched",
		defaultValues: defaultValues,
	});
	const { control, handleSubmit, setValue, watch, reset } = form;

	React.useEffect(() => {
		if (!data) return;
		const formValues = {
			...defaultValues,
			...data,
			satuan: data?.satuan,
			harga_beli: Number(data.harga_beli ?? 0),
			harga_jual: Number(data.harga_jual ?? 0),
		};
		// console.log("Reset values:", formValues);
		reset(formValues);
	}, [reset, data, defaultValues]);

	// QUERY
	const { mutate: AddData, isPending } = useAddMasterInventory();
	const { mutate: EditData } = useEditMasterInventory();

	// console.log(typeof getValues("harga_beli"));
	const onSubmit = (data: IzMasterInventory) => {
		if (id) {
			console.log(data);
			EditData({ id: id, data: data });
		} else {
			AddData(data);
		}
	};

	const hargaBeli = watch("harga_beli");
	const hargaJual = watch("harga_jual");

	const formatCurrency = (raw: string) => {
		const number = Number(raw.replace(/\D/g, ""));
		return raw ? FormatRupiah(number) : "";
	};

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="grid grid-cols-1 md:grid-cols-2 gap-12.5 px-6 py-10"
			>
				<FormField
					control={control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Input nama barang" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="katagory"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Catagory</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Input Catagory" type="text" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="satuan"
					render={({ fieldState }) => (
						<FormItem>
							<FormLabel>Satuan</FormLabel>
							<FormControl>
								<DataSelect
									key={watch("satuan")}
									className="w-full bg-background-secondary"
									placeholder="Select satuan"
									fieldState={!!fieldState.error}
									dataSelect={[
										{ items: "pcs", value: "pcs" },
										{ items: "kg", value: "kg" },
										{ items: "pack", value: "pack" },
										{ items: "dus", value: "dus" },
									]}
									value={watch("satuan")}
									onValueChange={(val) =>
										setValue("satuan", val, { shouldValidate: true })
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="harga_beli"
					render={() => (
						<FormItem>
							<FormLabel>Harga Beli</FormLabel>
							<FormControl>
								<Input
									placeholder="Input harga beli"
									type="text"
									value={formatCurrency(String(hargaBeli))}
									onChange={(e) => {
										const raw = e.target.value;
										const num = Number(raw.replace(/\D/g, ""));
										setValue("harga_beli", num, { shouldValidate: true });
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="stock"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Stock</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Input stock"
									type="text"
									onChange={(e) =>
										field.onChange(Math.max(0, Number(e.target.value) || 0))
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="harga_jual"
					render={() => (
						<FormItem>
							<FormLabel>Harga Jual</FormLabel>
							<FormControl>
								<Input
									placeholder="Input harga jual"
									type="text"
									value={formatCurrency(String(hargaJual))}
									onChange={(e) => {
										const raw = e.target.value;
										const num = Number(raw.replace(/\D/g, ""));
										setValue("harga_jual", num, { shouldValidate: true });
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-end col-span-full">
					<Button
						type="submit"
						className="w-full max-w-[153px] cursor-pointer "
						disabled={isPending}
					>
						{id ? "Save change" : "Save"}
						{isPending && <LoaderCircle className="animate-spin" />}
					</Button>
				</div>
			</form>
		</Form>
	);
}
