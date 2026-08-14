import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import reactHooks from "eslint-plugin-react-hooks";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "styled-system/**",
      "next-env.d.ts",
    ],
  },
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      // These React 19 compiler rules are useful guidance, but the existing
      // codebase intentionally uses these patterns in browser synchronization
      // and error handling paths.
      "react-hooks/error-boundaries": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default eslintConfig;
