import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const backendPackage = JSON.parse(
  readFileSync(join(__dirname, '..', 'Backend', 'package.json'), 'utf-8')
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    'import.meta.env.VITE_BACKEND_VERSION': JSON.stringify(backendPackage.version ?? '1.0.0'),
  },
});
