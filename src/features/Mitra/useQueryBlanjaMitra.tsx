"use client";
import { fetchBlanjaInventory, fetchByKodeMitra } from "@/actions";
import { DetailTransaksi } from "@/components/dashboard/organisms";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import AxiosInstance from "@/lib/axios";
import { handleOnError } from "@/lib/errors/handleOnError";
import { IzBlanjaMitra } from "@/schema";
import { useFormModalStore, useQueryParamStore } from "@/stores";
import { useBlanjaStore, usePlaceOrder } from "@/stores/useBlanjaStore";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Download, Printer } from "lucide-react";
import { useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import { useReactToPrint } from "react-to-print";
import Image from "next/image";
import { useGetMasterInventory } from "../Inventory";

export const useGetInventoryBlanja = () => {
	const { search, perPage, page } = useQueryParamStore();
	const [debouncedSearch] = useDebounce(search, 700);

	return useQuery({
		queryKey: [
			"master-inventory-cache",
			{ search: debouncedSearch, perPage, page },
		],
		queryFn: async () => {
			const result = await fetchBlanjaInventory({
				search: debouncedSearch,
				perPage,
				page,
			});

			return result.data;
		},
	});
};

export const useKodeMitra = (kode: string) => {
	const [debouncedkode] = useDebounce(kode, 700);

	return useQuery({
		queryKey: ["master-mitra-cache", debouncedkode],
		queryFn: async () => {
			const result = await fetchByKodeMitra(debouncedkode);
			return result.data;
		},
		enabled: !!debouncedkode,
	});
};

export const useAddBlanjaMitra = () => {
	const contentRef = useRef<HTMLDivElement>(null);
	const { toggle } = usePlaceOrder();
	const { clearItems } = useBlanjaStore();
	const { open } = useFormModalStore();

	const { refetch: refetchInventory } = useGetMasterInventory()
	const reactToPrintFn = useReactToPrint({ contentRef });

	const hanldeOpenFormModel = useCallback(
		(data: any) => {
			open({
				size: "sm",
				className: "w-[415px]",
				children: (
					<div ref={contentRef} className="">
						<div className="hidden print:flex justify-center">
							<Image
								src="/logo.png"
								alt="Logo Angkringan Cinta"
								width={118}
								height={74}
								priority
								className="object-contain"
							/>
						</div>
						<div className="py-1 print:py-6 print:flex print:flex-col print:justify-center print:items-center print:text-center">
							<h1 className="text-lg font-semibold hidden print:block print:font-bold">
								E-Receipt
							</h1>
							<span className="text-lg">
								<span className="print:hidden">Order-code :</span>
								{data.data.order_code ?? ""}
							</span>
						</div>
						<DetailTransaksi data={data ?? []} />,
						<DialogFooter className="print-hidden print:hidden">
							<DialogClose asChild>
								<Button type="button" variant="outline" formNoValidate>
									Cancel
								</Button>
							</DialogClose>
							<Button
								type="submit"
								onClick={reactToPrintFn}
								// disabled={isPending}
								className="cursor-pointer flex"
							>
								<Printer />
								Print
								{/* {id ? "Save change" : "Save"}
							{isPending && <LoaderCircle className="animate-spin" />} */}
							</Button>
							<Button
								type="submit"
								variant={"secondary"}
								// disabled={isPending}
								className="cursor-pointer flex"
							>
								<Download />
								Download
								{/* {id ? "Save change" : "Save"}
							{isPending && <LoaderCircle className="animate-spin" />} */}
							</Button>
						</DialogFooter>
					</div>
				),
			});
		},
		[open, reactToPrintFn]
	);

	return useMutation({
		mutationFn: async (payload: IzBlanjaMitra) => {
			const result = await AxiosInstance.post("/cms/mitra/blanja", payload);
			return result.data;
		},
		onSuccess(data) {


			hanldeOpenFormModel(data);
			toast.success("creat data successfully");

			// refetch inventory
			refetchInventory()
			// clear stores
			clearItems();
			toggle();

		},
		onError(err) {
			const { status, message } = handleOnError(err);

			if (status === 409) {
				toast.error("data already exists");
			} else {
				toast.error(message || "Failed to create shopping mitra");
			}
		},
	});
};
