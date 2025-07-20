import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const ipLocateUrl = env.VITE_IPLOCATE_API_URL || 'https://www.iplocate.io/api';

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      proxy: {
        '/iplocate': {
          target: ipLocateUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/iplocate/, ''),
        },
      },
    },
  };
});
