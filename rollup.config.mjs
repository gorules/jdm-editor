import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import external from 'rollup-plugin-peer-deps-external'
import scss from 'rollup-plugin-scss'
import pkg from './package.json' assert { type: 'json' };

import sassRuntime from 'sass';

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
      scss({
        output: './dist/css/style.css',
        failOnError: true,
        runtime: sassRuntime,
      }),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external: [/\.(sass|scss|css)$/] /* ignore style files */,
    plugins: [dts()],
  },
]
