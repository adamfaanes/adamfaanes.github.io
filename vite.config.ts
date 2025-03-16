import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import Pages from 'vite-plugin-pages';
import { RouteObject, createBrowserRouter } from "react-router-dom";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Pages({
      dirs: [{ dir: 'src/artifacts/roca-mockup', baseRoute: '', filePattern: '**/*.tsx' }],
      extensions: ['jsx', 'tsx'],   
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'src': path.resolve(__dirname, './src'),
      // 'roca-mockup': path.resolve(__dirname, '.'),
      // 'roca-mockup': __dirname,
    },
  },
  base: '', // Set this to the path your app is served from
  // other configurations
})
