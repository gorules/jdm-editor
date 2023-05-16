import * as path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      name: 'JDM Editor',
      fileName: 'jdm-editor'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          'react-dom': 'ReactDOM',
          'react': 'React'
        }
      }
    }
  }
})
