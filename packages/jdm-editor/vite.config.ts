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
    }),
  ],
  resolve: {
    dedupe: ['@lezer/common', '@lezer/lr', '@lezer/highlight'],
  },
  build: {
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      name: 'JDM Editor',
      fileName: 'jdm-editor',
    },
    rollupOptions: {
      external: [
        'react/jsx-runtime',
        'react',
        'react-dom',
        /ace-builds\/?.*/,
        ...Object.keys(packageJson.dependencies),
      ],
      output: {
        globals: {
          'react-dom': 'ReactDOM',
          'react': 'React',
        },
      },
    },
  },
});
