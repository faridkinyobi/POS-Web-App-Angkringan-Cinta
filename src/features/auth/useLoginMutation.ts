import AxiosInstance from "@/lib/axios";
import { IzLoginInput } from "@/schema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const useLoginMutation = () => {
	const router = useRouter();
	return useMutation({
		mutationFn: async (data: IzLoginInput) => {
			const result = await AxiosInstance.post("/auth/signin", data);
			return result.data;
		},
		onSuccess(data) {
			if (data) {
				localStorage.setItem("name", data.data.name);
				localStorage.setItem("role", data.data.role);
				router.push("/dashboard");
			}
		},
		onError(error) {
			const status = (error as AxiosError<any>).response?.data?.error
				.httpStatus;
			if (status === 401 && 404) {
				toast.error("Email atau password salah!");
			}
		},
	});
};
