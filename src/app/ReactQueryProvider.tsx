"use client";
import {
	isServer,
	keepPreviousData,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";

import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FormDialogProvider } from "@/components/dashboard/organisms";

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5, //4m
				gcTime: 1000 * 60 * 20,
				refetchOnWindowFocus: false, // Tidak fetch ulang saat pindah tab
				placeholderData: keepPreviousData,
			},
		},
	});
}
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
	if (isServer) {
		// Server: always make a new query client
		return makeQueryClient();
	} else {
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient!;
	}
}

export function ReactQueryProvider({ children }: { children: ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<FormDialogProvider />
			{children} <ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
