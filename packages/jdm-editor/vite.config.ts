import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import wasm from 'vite-plugin-wasm';

import packageJson from './package.json';

export default defineConfig({
  plugins: [
    wasm(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      aliasesExclude: ['@gorules/zen-engine-wasm'],
    }),
  ],
  resolve: {
    dedupe: ['@lezer/common', '@lezer/lr', '@lezer/highlight'],
    alias: {
      '@gorules/zen-engine-wasm': path.resolve(__dirname, 'src', 'zen-wasm-proxy.ts'),
    },
  },
  build: {
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      name: 'JDM Editor',
      fileName: 'jdm-editor',
    },
    rollupOptions: {
      external: ['react', 'react-dom', ...Object.keys(packageJson.dependencies)],
      output: {
        globals: {
          'react-dom': 'ReactDOM',
          'react': 'React',
        },
      },
    },
  },
});
