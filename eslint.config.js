// eslint.config.js
import js from "@eslint/js";

export default [
 js.configs.recommended,
 {
  ignores: [
   "node_modules/**",   // always ignore dependencies
   "dist/**",           // ignore build output
   "build/**",          // if you have a build folder
   "*.min.js",          // ignore minified files
   "coverage/**"        // ignore test coverage
  ],
  rules: {
   "indent": ["error", 1],       // 1-space indentation
   "semi": ["error", "always"],  // require semicolons
   "quotes": ["error", "double"] // enforce double quotes
  }
 }
];
