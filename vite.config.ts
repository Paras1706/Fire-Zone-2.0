import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', 'VITE_');
    return {
      base: '/Fire-Zone-2.0/',
      server: {
        port: 3000,
        host: '127.0.0.1',
      },
      build: {
        outDir: 'dist',
        sourcemap: false,
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
        'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || 'http://localhost:5000/api'),
        'import.meta.env.VITE_ADMIN_PASSWORD': JSON.stringify(env.VITE_ADMIN_PASSWORD || 'Paras@1318'),
        'import.meta.env.VITE_UPI_ID': JSON.stringify(env.VITE_UPI_ID || ''),
        'import.meta.env.VITE_PAYEE_NAME': JSON.stringify(env.VITE_PAYEE_NAME || ''),
        'import.meta.env.PROD': JSON.stringify(mode === 'production')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
