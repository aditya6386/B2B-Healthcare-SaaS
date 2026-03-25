import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'b2b_healthcare_host',
      filename: 'remoteEntry.js',
      remotes: {}, // Simulated: No actual remotes for this assignment, but config exists
      exposes: {
        './AuthFeature': './src/features/auth/AuthPage.tsx', // Simulated exporting features
      },
      shared: ['react', 'react-dom', 'zustand', 'react-router-dom']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext'
  }
});
