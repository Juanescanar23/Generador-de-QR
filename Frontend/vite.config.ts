import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const buildTime = new Date().toISOString();
const commitSha = process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || process.env.COMMIT_SHA || '';
const shortSha = commitSha ? commitSha.slice(0, 7) : '';
const buildId = shortSha ? `${shortSha}-${buildTime}` : buildTime;

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
    __APP_BUILD_TIME__: JSON.stringify(buildTime),
    __APP_COMMIT_SHA__: JSON.stringify(shortSha),
    __APP_BUILD_ID__: JSON.stringify(buildId),
  },
});
