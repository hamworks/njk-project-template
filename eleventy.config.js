import { resolve } from 'node:path';
import EleventyVitePlugin from '@11ty/eleventy-plugin-vite';
import tailwindcss from '@tailwindcss/vite';

export default function (eleventyConfig) {
  // Viteプラグイン統合
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      root: process.cwd(),
      publicDir: 'public', // Vite が public/ を dist/ にコピー
      plugins: [
        tailwindcss(),
      ],
      resolve: {
        alias: {
          '/src': resolve(process.cwd(), 'src'),
        },
      },
      build: {
        rollupOptions: {
          input: resolve(process.cwd(), 'src/assets/js/main.ts'),
        },
      },
    },
  });

  // ウォッチ対象
  eleventyConfig.addWatchTarget('src/assets/**/*');
  eleventyConfig.addWatchTarget('src/_includes/**/*.njk');

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      data: '_data',
    },
  };
}
