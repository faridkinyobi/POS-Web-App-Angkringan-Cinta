import { config } from "@/config";
import { refreshAccessToken } from "@/features";

import axios from "axios";

const AxiosInstance = axios.create({
	baseURL: `${config.api_host_dev}/api/v1` || "/api/v1",
	withCredentials: true,
});
let isRefreshing = false;

AxiosInstance.interceptors.response.use(undefined, async (error) => {
	// console.log("Interceptor caught error:", error.response);
	// console.log(
	// 	"Interceptor caught error:",
	// 	error.response.data.error.httpStatus
	// );
	const message = error?.response?.data?.error?.message;
	const status = error?.response?.data?.error?.status;
	const originalRequest = error.config;

	if (
		(status === 401 || message === "jwt expired") &&
		!originalRequest._retry
	) {
		originalRequest._retry = true;
		if (!isRefreshing) {
			isRefreshing = true;
			await refreshAccessToken()
				.then((token) => {
					isRefreshing = false;
					originalRequest.headers.Authorization = `Bearer ${token}`;
					return AxiosInstance(originalRequest);
				})
				.catch((err) => {
					AxiosInstance.post("/auth/logout");
					isRefreshing = false;
					if (typeof window !== "undefined") {
						window.location.href = "/pos-angkringan-cinta";
					}
					throw err;
				});
		}
	}
	return Promise.reject(error);
});
export default AxiosInstance;
