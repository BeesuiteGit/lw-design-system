import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['stories', 'examples', '**/*.stories.tsx'],
      rollupTypes: false,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LouisWeissDesignSystem',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'framer-motion',
        'react-intersection-observer',
        'clsx',
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) return 'styles/[name][extname]';
          return 'assets/[name][extname]';
        },
      },
    },
    sourcemap: true,
    cssCodeSplit: false,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: 'lw_[name]__[local]__[hash:base64:5]',
    },
  },
});
