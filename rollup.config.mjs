import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'
import dts from 'rollup-plugin-dts'
import external from 'rollup-plugin-peer-deps-external'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/cjs/index.js',
        format: 'cjs',
        assetFileNames: '[name][extname]',
      },
      {
        file: 'dist/esm/index.js',
        format: 'esm',
        assetFileNames: '[name][extname]',
      },
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({
        exclude: ['**/*.stories.*', '**/*.test.*'],
      }),
      terser(),
      copy({
        targets: [{ src: 'src/styles.css', dest: 'dist' }],
      }),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
]
