import AxiosInstance from "@/lib/axios";

export async function refreshAccessToken() {
	const response = await AxiosInstance.post("/auth/refresh", {
		withCredentials: true, // agar cookie refresh_token terkirim
	});
	return response.data;
}
