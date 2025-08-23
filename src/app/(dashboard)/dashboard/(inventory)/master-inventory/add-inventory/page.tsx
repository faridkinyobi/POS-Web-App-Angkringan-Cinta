import { TopFormHeader } from "@/components/dashboard/molecules";
import { FormMasterInventory } from "@/components/dashboard/organisms";
import FormLayouts from "@/components/dashboard/templates/FormLayouts";
import React from "react";

export default function page() {
	return (
		<FormLayouts>
			<TopFormHeader label="Menege Master Inventory" />
			<FormMasterInventory />
		</FormLayouts>
	);
}
