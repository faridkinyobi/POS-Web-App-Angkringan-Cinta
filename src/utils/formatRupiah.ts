const rupiahCache = new Map<number, string>();

export function FormatRupiah(price: number) {
	const changePrice = Number(price);
	if (isNaN(changePrice)) return "Rp0";

	if (rupiahCache.has(changePrice)) {
		return rupiahCache.get(changePrice)!;
	}

	const formatted = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(changePrice);

	rupiahCache.set(changePrice, formatted);
	return formatted;
}
