import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000,
  },
  plugins: [
    react(),
    federation({
      name: 'app',
      remotes: {
        stockApp: 'http://localhost:5001/assets/remoteEntry.js',
        employeesApp: 'http://localhost:5002/assets/remoteEntry.js',
      },
      shared: [
        'react',
        'react-dom',
        '@chakra-ui/react',
        '@emotion/react',
        '@emotion/styled',
        'framer-motion',
        'axios',
        'react-query',
        'react-hook-form',
        'react-toastify',
      ],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
