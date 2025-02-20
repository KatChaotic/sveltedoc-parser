import chaiExpect from "eslint-plugin-chai-expect";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["test/**/*.importable.js"],
}, ...compat.extends("eslint:recommended"), {
    plugins: {
        "chai-expect": chaiExpect,
    },

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.mocha,
            expect: false,
        },

        ecmaVersion: 2018,
        sourceType: "commonjs",

        parserOptions: {
            ecmaFeatures: {
                jsx: false,
            },
        },
    },

    settings: {},

    rules: {
        curly: ["error", "all"],
        "no-var": "error",

        indent: ["error", 4, {
            SwitchCase: 1,
        }],

        semi: ["error", "always"],
        "object-curly-spacing": ["error", "always"],
        "comma-dangle": ["error", "only-multiline"],

        "space-before-function-paren": ["error", {
            anonymous: "always",
            named: "never",
            asyncArrow: "always",
        }],

        "padding-line-between-statements": ["error", {
            blankLine: "always",
            prev: ["directive", "import", "const", "let", "block-like"],
            next: "*",
        }, {
            blankLine: "always",
            prev: "*",
            next: ["export", "return", "throw", "block-like"],
        }, {
            blankLine: "any",
            prev: "import",
            next: "import",
        }, {
            blankLine: "any",
            prev: "const",
            next: "const",
        }, {
            blankLine: "any",
            prev: "let",
            next: "let",
        }],

        "padded-blocks": ["error", "never"],
        "prefer-rest-params": "error",
        "prefer-spread": "error",
        "prefer-const": "error",
        "chai-expect/terminating-properties": 1,
        "no-unused-expressions": "off",
    },
}];
