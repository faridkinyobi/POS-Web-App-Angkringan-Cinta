import React from "react";

type Props = {
	initialValue?: boolean;
};

export default function useToggle({
	initialValue = false,
}: Props): [boolean, () => void] {
	const [state, setState] = React.useState(initialValue);
	const toggle = () => setState((prev) => !prev);
	return [state, toggle];
}
