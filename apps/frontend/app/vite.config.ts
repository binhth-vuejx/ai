import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';

// Custom plugin to replace the default URLs with the custom domain in the terminal
const domainPlugin = () => ({
  name: 'domain-info',
  configureServer(server) {
    server.printUrls = () => {
      console.log(`  \x1b[32m➜\x1b[0m  \x1b[1mLocal:\x1b[0m   \x1b[36mhttps://xlsx.fds.vn/\x1b[0m`);
    };
  }
});

export default defineConfig({
  plugins: [
    svelte({
      configFile: false,
    }),
    tailwindcss(),
    domainPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '$lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
    },
  },
  server: {
    port: 4005,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    open: 'https://xlsx.fds.vn',
    fs: {
      allow: ['..'],
    },
    hmr: {
      host: 'xlsx.fds.vn',
      protocol: 'wss',
      clientPort: 443
    },
    proxy: {
      '/trpc': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
