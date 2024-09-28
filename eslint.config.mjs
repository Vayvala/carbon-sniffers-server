import globals from "globals";
import js from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import node from "eslint-plugin-n";
export default [
  js.configs.recommended,
  jsdoc.configs['flat/recommended'],
  node.configs["flat/recommended-script"],
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node
    }
    },
    rules: {
      "arrow-body-style": ["error", "as-needed"],
      "no-extra-parens": "off",
      "node/no-missing-require": "off",
      "no-template-curly-in-string": "error",
      "prefer-const": "error",
      "prefer-promise-reject-errors": "error",
      "require-atomic-updates": "off",
      "semi": ["error", "always"],
      "jsdoc/require-param-description": "off",
      "jsdoc/require-property-description": "off",
      "jsdoc/require-returns-description": "off",
      "n/no-missing-require": ["error", {
        "allowModules": [],
        "resolvePaths": ["node_modules", "/src", "../src"],
        "tryExtensions": [".js", ".json", ".node"]
      }]
    }
  }
];