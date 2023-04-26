import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import imagemin from 'vite-plugin-imagemin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagemin({
      gifsicle: {},
      mozjpeg: {},
      pngquant: {
        quality: [0.7, 0.9],
        speed: 4,
      },
      svgo: {},
      webp: {},
    }),
  ],
  assetsInclude: ['**/*.PNG'],
});
