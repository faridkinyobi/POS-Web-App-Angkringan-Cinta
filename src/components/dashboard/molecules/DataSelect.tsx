import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import React from "react";
import type { SelectProps } from "@radix-ui/react-select";

type Props = SelectProps & {
	placeholder: string;
	className?: string;
	dataSelect: {
		value: string;
		items: string;
	}[];
	value?: string;
	onChange?: (value: string) => void;
	fieldState?: boolean;
};

export default function DataSelect({
	dataSelect,
	placeholder,
	className,
	fieldState,
	...props
}: Props) {
	return (
		<Select {...props}>
			<SelectTrigger
				className={className}
				aria-invalid={fieldState}
				aria-label={placeholder}
			>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{dataSelect.map((i) => {
					return (
						<SelectItem key={`items-${i.value}`} value={i.value}>
							{i.items}
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
}
