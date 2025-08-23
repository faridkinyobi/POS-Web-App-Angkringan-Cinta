// lib/getPathTitle.ts
export function getPathTitle(pathname: string) {
	// Ambil semua segment, buang string kosong
	const pathSegments = pathname.split("/").filter(Boolean);

	// Ambil segment terakhir
	const lastSegment = pathSegments[pathSegments.length - 1];

	// Deteksi kalau segment terakhir adalah ID (UUID atau angka panjang)
	const isId = /^[0-9a-fA-F-]{8,}$/.test(lastSegment);

	// Kalau ID → ambil segment sebelumnya
	const segment = isId ? pathSegments[pathSegments.length - 2] : lastSegment;

	// Convert ke Title Case
	return segment
		.replace(/-/g, " ") // ganti "-" jadi spasi
		.replace(/\b\w/g, (char) => char.toUpperCase()); // kapital huruf awal kata
}
