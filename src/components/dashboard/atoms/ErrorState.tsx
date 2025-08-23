import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function ErrorState({ onRetry }: { onRetry: () => void }) {
	return (
		<div className="flex flex-col items-center justify-center p-8 space-y-4">
			<AlertTriangle className="w-12 h-12 text-red-500 animate-bounce" />
			<p className="text-lg font-medium text-gray-700">
				Oops! Gagal memuat data 😢
			</p>
			<Button
				onClick={onRetry}
				className="px-5 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 focus:ring-2 focus:ring-offset-2 focus:ring-primary transition"
			>
				🔄 Coba Lagi
			</Button>
		</div>
	);
}
