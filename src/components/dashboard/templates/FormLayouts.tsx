import React from "react";

export default function FormLayouts({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="bg-background-secondary rounded-lg">{children}</div>;
}
