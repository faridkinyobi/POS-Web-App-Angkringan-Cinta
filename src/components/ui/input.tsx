import * as React from "react";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	endIcon?: React.ReactNode | LucideIcon;
	onClickEndIcon?: () => void;
}
// React.ComponentProps<"input">
function Input({
	className,
	type,
	endIcon,
	onClickEndIcon,
	...props
}: InputProps) {
	const renderEndIcon = () => {
		if (!endIcon) return null;

		if (typeof endIcon === "function") {
			const IconComponent = endIcon as LucideIcon;
			return <IconComponent size={24} />;
		}

		return endIcon;
	};

	return (
		<div className="relative bg-background-secondary">
			<input
				type={type}
				data-slot="input"
				className={cn(
					"placeholder:text-muted-foreground placeholder:font-medium placeholder:text-sm md:placeholder:text-base ",
					"dark:bg-input/30 border-input selection:bg-primary selection:text-primary-foreground",
					"flex h-10 w-full min-w-0 rounded-lg border bg-transparent px-3 py-2.5",
					"text-sm md:text-base shadow-xs transition-[color,box-shadow] outline-none font-medium",
					"file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm md:file:text-base file:font-medium",
					"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-sm md:text-base font-medium",
					"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
					"aria-invalid:ring-destructive/50 dark:aria-invalid:ring-destructive/50 aria-invalid:border-destructive ",
					endIcon && "pr-10",
					className
				)}
				{...props}
			/>
			{endIcon && (
				<div
					className={cn(
						"absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
						onClickEndIcon ? "cursor-pointer" : ""
					)}
					onClick={onClickEndIcon}
				>
					{renderEndIcon()}
				</div>
			)}
		</div>
	);
}

export { Input };
