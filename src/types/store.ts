import { ReactNode } from "react";
import { IzSchemaQueryParams } from "@/schema";

export interface ModalOptions {
	title?: string;
	size?: "sm" | "md" | "lg" | "xl";
	desc?: string;
	children?: ReactNode;
}
export interface IModalState {
	isOpen: boolean;
	props: ModalOptions | null;
	open: (props: ModalOptions) => void;
	close: () => void;
}

export interface IQueryParamsStore extends IzSchemaQueryParams {
	setQueryParamsStore: (param: Partial<IQueryParamsStore>) => void;
}

// Blanja Mitra TypeStore
export interface ICartItem {
	harga_jual: number
	harga: number
	id: string
	Subtotal: number
	qty: number;
}
export interface ICartStore {
	items: ICartItem[];
	grandTotal: number;
	subTotal: number;

	addItem: (item: ICartItem) => void;
	removeItem: (id: string) => void;
	updateQty: (id: string, type: string) => void;
}
// Place Order
export interface IPlaseOrderState {
	isNext: boolean;
	toggle: () => void;
}
