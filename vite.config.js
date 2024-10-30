import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        input: './index.html',
        output: {
          assetFileNames: (assetInfo) => {
            if (/\.(png|jpe?g|webp|gif|svg)$/.test(assetInfo.name)) {
              return 'assets/[name][extname]';  // No hash for images
            }
            return 'assets/[name]-[hash][extname]';  // Hash for other assets
          },
        },
      },
      assetsInlineLimit: 0,  // Prevent inlining of small assets
    },
    server: {
      port: 3000,
      open: true,
    },
    preview: {
      port: 5000,
      open: true,
    },
    define: {
      'import.meta.env.VITE_BASE_URL': JSON.stringify(env.VITE_BASE_URL),
    },
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      mock: true,
      dirStyle: 'nested',
      includedRoutes: (paths, routes) => {
        const baseRoutes = [
          '/',
        ];

        const jobRoutes = ['/job-1', '/job-2', '/job-3', '/job-4', '/job-5', '/job-6'];
        const languages = ['en', 'ar'];

        const generatedRoutes = baseRoutes.flatMap(baseRoute => {
          return languages.map(lang => lang === 'ar' ? baseRoute : `/${lang}${baseRoute}`);
        });

        jobRoutes.forEach(jobRoute => {
          languages.forEach(lang => {
            const jobPath = lang === 'ar' ? `${jobRoute}` : `/en${jobRoute}`;
            generatedRoutes.push(jobPath);
          });
        });

        generatedRoutes.push('/en/404', '/404');
        return generatedRoutes;
      }
    },
    buildEnd() {
      try {
        const tempDir = path.resolve(__dirname, '.vite-ssg-temp');
        fs.rmdirSync(tempDir, { recursive: true });
        console.log(`Cleaned up: ${tempDir}`);
      } catch (err) {
        console.error('Error during cleanup:', err);
      }
    },
  };
});
