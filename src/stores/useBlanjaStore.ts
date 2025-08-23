import { ICartStore, IPlaseOrderState } from "@/types";
import { create } from "zustand";

export const useBlanjaStore = create<ICartStore>((set) => ({
	items: [],
	subTotal: 0,
	grandTotal: 0,
	amount_paid: 0,
	refund: 0,
	addItem: (item) =>
		set((state) => {
			// check apakah data sudah ada
			const existingItem = state.items.find((i) => i.id === item.id);

			if (existingItem) {
				const updatedItems = state.items.map((i) =>
					i.id === item.id
						? {
							...i,
							qty: Number(i.qty) + 1,
							total: (i.qty + 1) * i.harga_jual,
						}
						: i
				);

				const subTotal = updatedItems.reduce((acc, cur) => acc + cur.Subtotal, 0);

				return { ...state, items: updatedItems, subTotal, grandTotal: subTotal };
			}

			if (!existingItem) {
				const newItems = {
					...item,
					harga: Number(item.harga_jual),
					qty: 1,
					Subtotal: Number(item.harga_jual),
				};

				const updatedItems = [...state.items, newItems];
				return { ...state, items: updatedItems, grandTotal: item.harga_jual, subTotal: item.harga_jual };
			}

			return state;
		}),

	removeItem: (id) =>
		set((state) => {
			const updatedItems = state.items.filter((i) => i.id !== id);
			const subTotal = updatedItems.reduce((acc, cur) => acc + cur.Subtotal, 0);

			return {
				...state,
				items: updatedItems,
				subTotal,
				grandTotal: subTotal,
			};
		}),

	updateQty: (id, type) =>
		set((state) => {
			const updatedItems = state.items.map((i) => {
				if (i.id !== id) return i;
				const newQty = type === "plus" ? i.qty + 1 : Math.max(1, i.qty - 1);
				return {
					...i,
					qty: newQty,
					Subtotal: newQty * i.harga_jual,
				};
			});
			const subTotal = updatedItems.reduce((acc, cur) => acc + cur.Subtotal, 0);

			return { ...state, items: updatedItems, subTotal, grandTotal: subTotal };
		}),
}));

export const usePlaceOrder = create<IPlaseOrderState>((set) => ({
	isNext: false,
	toggle: () =>
		set((prev) => ({
			isNext: !prev.isNext,
		})),
}));
