"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { useFormModalStore } from "@/stores/useModelStore";

export default function FormDialogProvider() {
	const { isOpen, close, props } = useFormModalStore();
	const sizeClass = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
	} as const;

	const dialogSize =
		sizeClass[props?.size as keyof typeof sizeClass] ?? "max-w-sm";
	return (
		<Dialog open={isOpen} onOpenChange={close}>
			<DialogContent className={cn(dialogSize)}>
				<DialogHeader>
					<DialogTitle>{props?.title}</DialogTitle>
				</DialogHeader>
				{props?.children}
			</DialogContent>
		</Dialog>
	);
}
