import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		rules: {
			// Allow usage of 'any' type
			"@typescript-eslint/no-explicit-any": "off",

			// Relax unused variables rule: allow prefixed `_` to ignore variables
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					vars: "all",
					args: "after-used",
					ignoreRestSiblings: true,
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],

			// Turn off React PropTypes rule (if using TypeScript for props)
			"react/prop-types": "off",

			// Adjust no-console to allow console statements as warnings
			"no-console": [
				"warn",
				{
					allow: ["warn", "error"], // Allow specific methods
				},
			],

			// Rule for unused expressions (e.g., short-circuit evaluations)
			"@typescript-eslint/no-unused-expressions": [
				"error",
				{
					allowShortCircuit: true, // Allow logical AND/OR short circuits
					allowTernary: true, // Allow ternary expressions
					allowTaggedTemplates: false, // Disallow tagged template literals
				},
			],
		},
	},
];

export default eslintConfig;
