"use client";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useAlertModalStore } from "@/stores/useModelStore";

export default function AlertDialogProvider() {
	const { isOpen, close, props } = useAlertModalStore();
	const sizeClass = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
	} as const;

	const dialogSize =
		sizeClass[props?.size as keyof typeof sizeClass] ?? "max-w-sm";
	return (
		<AlertDialog open={isOpen} onOpenChange={close}>
			<AlertDialogContent className={cn(dialogSize)}>
				<AlertDialogHeader>
					<AlertDialogTitle>{props?.title}</AlertDialogTitle>
					<AlertDialogDescription>{props?.desc}</AlertDialogDescription>
				</AlertDialogHeader>
				{props?.children}
			</AlertDialogContent>
		</AlertDialog>
	);
}
