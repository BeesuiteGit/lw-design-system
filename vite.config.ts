import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';
import { cpSync } from 'node:fs';

function copyTokens(): Plugin {
  return {
    name: 'lw-copy-tokens',
    closeBundle() {
      cpSync(resolve(__dirname, 'src/tokens'), resolve(__dirname, 'dist/tokens'), { recursive: true });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['stories', 'examples', '**/*.stories.tsx'],
      rollupTypes: false,
    }),
    copyTokens(),
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
    sourcemap: false,
    cssCodeSplit: false,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: 'lw_[name]__[local]__[hash:base64:5]',
    },
  },
});
