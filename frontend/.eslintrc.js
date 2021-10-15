module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-console": "off",
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        trailingComma: "all",
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: "always",
        endOfLine: "auto",
      },
    ],
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  
  // overrides: [
  //   {
  //     files: [
  //       "**/__tests__/*.{j,t}s?(x)",
  //       "**/tests/unit/**/*.spec.{j,t}s?(x)"
  //     ]
  //   }
  // ]
};
