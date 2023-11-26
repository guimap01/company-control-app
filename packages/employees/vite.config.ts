import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5002,
  },
  plugins: [
    react(),
    federation({
      name: 'employeesApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Employees': './src/Employees.tsx',
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
