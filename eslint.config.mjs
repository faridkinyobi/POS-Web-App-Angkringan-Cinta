import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends(
		"next/core-web-vitals",
		"next/typescript",
		"plugin:@typescript-eslint/recommended",
		"plugin:@tanstack/query/recommended"
	),
	{
		ignores: ["node_modules/", "dist/", "build/", "prisma/**"],
	},
	{
		rules: {
			"@typescript-eslint/no-unused-vars": ["warn"],
			"tailwindcss/no-custom-classname": "off",
			"@typescript-eslint/interface-name-prefix": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@tanstack/query/exhaustive-deps": "warn",
			"@tanstack/query/no-rest-destructuring": "warn",
		},
	},
];

export default eslintConfig;
