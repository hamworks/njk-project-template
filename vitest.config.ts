import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.config.ts'],
    },
  },
  resolve: {
    alias: {
      '@js': resolve(process.cwd(), 'src/assets/js'),
      '@styles': resolve(process.cwd(), 'src/assets/css'),
    },
  },
});
