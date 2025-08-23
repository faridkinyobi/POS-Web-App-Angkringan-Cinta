import { IModalState } from "@/types";
import { create } from "zustand";

export const useAlertModalStore = create<IModalState>((set) => ({
	isOpen: false,
	props: null,
	open: (props) => set({ isOpen: true, props }),
	close: () => set({ isOpen: false, props: null }),
}));
export const useFormModalStore = create<IModalState>((set) => ({
	isOpen: false,
	props: null,
	open: (props) => set({ isOpen: true, props }),
	close: () => set({ isOpen: false, props: null }),
}));
