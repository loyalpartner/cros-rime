import rollupTypescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/main.ts",
    output: {
      file: "out/index.js",
      format: "es"
    },
    plugins: [
      rollupTypescript()
    ],
    treeshake: false
  }
]
