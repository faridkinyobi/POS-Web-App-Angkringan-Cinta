import NotFound from "@/app/not-found";
import { TopFormHeader } from "@/components/dashboard/molecules";
import { FormMasterMitra } from "@/components/dashboard/organisms";
import FormLayouts from "@/components/dashboard/templates/FormLayouts";

import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = await params;
	// console.log(id);
	if (!id) return <NotFound />;

	return (
		<FormLayouts>
			<TopFormHeader label="Menege Master Mitra" />
			<FormMasterMitra id={id} />
		</FormLayouts>
	);
}
