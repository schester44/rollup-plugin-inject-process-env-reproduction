import babel from "rollup-plugin-babel";
import injectProcessEnv from "rollup-plugin-inject-process-env";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const devEnvVariables = {
  ACCOUNT: "test",
};

export default {
  input: "test.js",
  output: {
    file: "output.js",
    format: "iife", // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true,
  },
  plugins: [
    resolve({
      browser: true,
    }), // tells Rollup how to find date-fns in node_modules
    commonjs({
      include: "node_modules/**",
    }), // converts date-fns to ES modules

    injectProcessEnv(devEnvVariables),
    babel({
      exclude: [/\/core-js\//],
      babelrc: false,
      presets: [
        [
          "@babel/preset-env",
          {
            corejs: 3,
            modules: false,
            useBuiltIns: "usage",
            targets: {
              ie: "11",
            },
          },
        ],
      ],
    }),
  ],
};
