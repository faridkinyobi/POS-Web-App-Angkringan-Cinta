import React from "react";

type Props = {
	initial?: boolean;
};

export default function useToggle({
	initial = false,
}: Props): [boolean, () => void] {
	const [state, setState] = React.useState(initial);
	const toggle = () => setState((prev) => !prev);
	return [state, toggle];
}
