"use client";
import { IzLaporanPenjualan } from "@/schema";
import React from "react";
import DataTable from "../../molecules/DataTable";
import dayjs from "dayjs";
import { FormatRupiah } from "@/utils/formatRupiah";

type Props = {
	data: IzLaporanPenjualan[];
	isLoading: boolean;
};

export default function TablelLaporanPenjualan({ data, isLoading }: Props) {

	return (
		<DataTable
			isLoading={isLoading}
			sourceData={data}
			columns={[
				{
					name: "no",
					indexData: "no",
					render: (_, i = 0) => 1 + i,
				},
				{
					name: "Tanggal",
					indexData: "createdAt",
					render(_value, _rowIndex, rowData) {
						return dayjs(rowData.createdAt).format("DD-MM-YYYY");
					},
				},
				{
					name: "Kode barang",
					indexData: "kode_barang",
					render(_value, _rowIndex, rowData) {
						return rowData.masterInventory.kode_barang
					},
				},
				{
					name: "Product",
					indexData: "product",
					render(_value, _rowIndex, rowData) {
						return rowData.masterInventory.name
					},
				},
				{
					name: "harga beli",
					indexData: "harga_beli",
					render(_value, _rowIndex, rowData) {
						return FormatRupiah(rowData.masterInventory.harga_beli);
					}
				},
				{
					name: "harga jual",
					indexData: "harga_jual",
					render(_value, _rowIndex, rowData) {
						return FormatRupiah(rowData.masterInventory.harga_jual);
					}
				},
				{
					name: "qty",
					indexData: "qty",
				},
				{
					name: "Omzet",
					indexData: "Omzet",
					render(_value, _rowIndex, rowData) {
						return FormatRupiah(rowData.omzet);
					}
				},
				{
					name: "Laba Kotor",
					indexData: "Laba Kotor",
					render(_value, _rowIndex, rowData) {
						return FormatRupiah(rowData.labaKotor);
					}
				},
			]}
		/>
	);
}
