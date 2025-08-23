import type { AxiosError } from "axios";

// export const handleOnError = (err: any) => {
// 	const error = err as AxiosError<{
// 		error?: { httpStatus?: number; message?: string };
// 	}>;
// 	return {
// 		status: error.response?.data?.error?.httpStatus ?? null,
// 		message: error.response?.data?.error?.message ?? "Unknown error",
// 	};
// };

export const handleOnError = (err: Error) => {
	const error = err as AxiosError<{
		error?: { httpStatus?: number; message?: string };
	}>;
	return {
		status: error.response?.data?.error?.httpStatus ?? null,
		message: error.response?.data?.error?.message ?? "Unknown error",
	};
};
