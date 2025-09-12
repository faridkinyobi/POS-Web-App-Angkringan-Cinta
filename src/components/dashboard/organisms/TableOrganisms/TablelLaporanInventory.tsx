"use client";
import { IzLaporanInventory } from "@/schema";
import React from "react";
import DataTable from "../../molecules/DataTable";
import dayjs from "dayjs";
import { FormatRupiah } from "@/utils/formatRupiah";


// import FormAmountPaid from "../FormOrganisms/FormAmountPaid";
type Props = {
	data: IzLaporanInventory[];
	isLoading: boolean;
};

export default function TablelLaporanInventory({ data, isLoading }: Props) {

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
					name: "kode barang",
					indexData: "kode_barang",
					render(_value, _rowIndex, rowData) {
						return rowData.masterInventory.kode_barang
					},
				},
				{
					name: "name",
					indexData: "name",
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
					name: "stok awal",
					indexData: "stock_awal",
				},
				{
					name: "stok masuk",
					indexData: "stock_masuk",
				},
				{
					name: "stok keluar",
					indexData: "stock_keluar",
				},
				{
					name: "stock akhir",
					indexData: "stock_akhir",
				},
				{
					name: "Status",
					indexData: "status",
				},
				{
					name: "Nilai Pembelian",
					indexData: "nilai_pembelian",
					render(_value, _rowIndex, rowData) {
						return FormatRupiah(rowData.nilai_pembelian);
					}
				},
				{
					name: "Nilai penjualan",
					indexData: "nilai_penjualan",
					render(_value, _rowIndex, rowData) {
						return FormatRupiah(rowData.nilai_penjualan);
					}
				},
			]}
		/>
	);
}
