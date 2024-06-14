import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.es2020,
        ...globals.node
      }
    }
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "quotes": ["warn", "double"],
      "default-case": "off",
      "class-methods-use-this": "off",
      "no-unused-vars": "off",
      // "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/comma-dangle": "off",
      "@typescript-eslint/lines-between-class-members": "off",
      "react/jsx-filename-extension": "off",
      "object-curly-newline": "off",
      "no-await-in-loop": "off",
      "no-restricted-syntax": "off",
      "semi": "error",
      "no-plusplus": "off",
      "no-continue": "off",
      "indent": ["warn", 2],
    }
  },
  {
    ignores: [
      "lib/**",
      "tests/**",
      "jest.config.js",
      "tsconfig.json",
      "tsconfig.eslint.json"
    ],
  }
];