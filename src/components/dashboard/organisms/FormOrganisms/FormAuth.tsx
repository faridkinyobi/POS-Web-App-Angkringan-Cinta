"use client";
import React from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import useToggle from "@/hooks/useToggle";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

// import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/features/auth/useLoginMutation";
import { AuthSchema, IzLoginInput } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function FormAuth() {
	const [isOpen, Tonggle] = useToggle({ initialValue: false });

	const form = useForm<IzLoginInput>({
		resolver: zodResolver(AuthSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { handleSubmit, control } = form;

	const { mutate, isPending } = useLoginMutation();

	const onSubmit = (data: any) => {
		mutate(data);
	};
	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
				<FormField
					control={control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="email" type="email" {...field} required />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Passoword</FormLabel>
							<FormControl>
								<Input
									placeholder="*******"
									type={isOpen ? "text" : "password"}
									endIcon={isOpen ? <Eye /> : <EyeOff />}
									onClickEndIcon={Tonggle}
									{...field}
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="mt-[5px] w-full cursor-pointer"
					disabled={isPending}
				>
					Login {isPending && <LoaderCircle className="animate-spin" />}
				</Button>
			</form>
		</Form>
	);
}
