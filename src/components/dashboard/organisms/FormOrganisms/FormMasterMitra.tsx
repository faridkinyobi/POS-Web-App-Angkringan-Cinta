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

import { IzMasterMitra, SchemaMasterMitra } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

// import { FormatRupiah } from "@/utils/formatRupiah";
import {
	useAddMasterMitra,
	useEditMasterMitra,
	useGetByIdMasterMitra,
} from "@/features";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { useFormModalStore } from "@/stores";

export default function FormMasterMitra({ id = "" }: { id?: string }) {
	const { close } = useFormModalStore();

	const { data } = useGetByIdMasterMitra(id);
	const defaultValues = React.useMemo(
		() => ({
			nama: "",
			telepon: "",
			alamat: "",
			kode_mitra: "",
		}),
		[]
	);

	const form = useForm<IzMasterMitra>({
		resolver: zodResolver(SchemaMasterMitra) as any,
		mode: "onTouched",
		defaultValues: defaultValues,
	});
	const { control, handleSubmit, reset } = form;

	React.useEffect(() => {
		if (!data) return;
		const formValues = {
			...defaultValues,
			...data,
		};

		// console.log("Reset values:", formValues);
		reset(formValues);
	}, [reset, data, defaultValues]);

	const watchNama = form
		.watch("nama")
		.trim()
		.split(" ")[0]
		.slice(0, 3)
		.toUpperCase();
	const watchTelp = form.watch("telepon").slice(8);
	const randomNum = Math.floor(1000 + Math.random() * 9000);

	React.useEffect(() => {
		if (watchNama && watchTelp && randomNum) {
			form.setValue("kode_mitra", `${watchNama}${randomNum}${watchTelp}`);
		}
	}, [watchNama, watchTelp, form, randomNum]);

	// QUERY
	const { mutate: AddData, isPending } = useAddMasterMitra();
	const { mutate: EditData } = useEditMasterMitra();

	// console.log(typeof getValues("harga_beli"));
	const onSubmit = (data: IzMasterMitra) => {
		console.log(data);
		if (id) {
			// console.log(data);
			EditData({ id: id, data: data });
			close();
		} else {
			AddData(data);
			close();
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={control}
					name="nama"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Input nama mitra" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="telepon"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Telepon</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Input no telepon" type="text" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="alamat"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Alamat</FormLabel>
							<FormControl>
								<Textarea {...field} placeholder="Input alamat" />
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
						{id ? "Save change" : "Save"}
						{isPending && <LoaderCircle className="animate-spin" />}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
