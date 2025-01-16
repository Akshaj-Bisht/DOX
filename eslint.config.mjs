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

			// Optionally allow console statements (set to 'warn' or 'off')
			"no-console": "warn",

			// Ignore the requirement of default exports in modules
			"import/prefer-default-export": "off",
		},
	},
];

export default eslintConfig;
