import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import type { RollupOptions } from "rollup";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json" assert { type: "json" };

const externalPackages = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const config: RollupOptions = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/cjs/index.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
      banner: `'use client';`,
    },
    {
      file: "dist/esm/index.js",
      format: "esm",
      sourcemap: true,
      exports: "named",
      banner: `'use client';`,
    },
  ],
  external: externalPackages,
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      // useTsconfigDeclarationDir: true,
      // typescript: require("typescript"),
      // tsconfig: "tsconfig.json",
      clean: true,
      exclude: ["rollup.config.ts"],
    }),
    postcss({
      modules: true,
    }),
    terser({
      compress: { directives: false },
    }),
  ],
};

export default config;
