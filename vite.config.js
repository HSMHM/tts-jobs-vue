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
              return 'assets/[name][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      assetsInlineLimit: 0,
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true,
        },
      },
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
        const baseRoutes = ['/'];
        const jobRoutes = Array.from({ length: 12 }, (_, i) => `/job-${i + 1}`);
        const languages = ['en', 'ar'];

        const generatedRoutes = baseRoutes.flatMap(baseRoute =>
          languages.map(lang => (lang === 'ar' ? baseRoute : `/${lang}${baseRoute}`))
        );

        jobRoutes.forEach(jobRoute => {
          languages.forEach(lang => {
            const jobPath = lang === 'ar' ? jobRoute : `/en${jobRoute}`;
            generatedRoutes.push(jobPath);
          });
        });

        generatedRoutes.push('/404', '/en/404');
        return generatedRoutes;
      },
      onFinished: () => {
        const paths = [
          { from: 'dist/404/index.html', to: 'dist/404.html' },
          { from: 'dist/en/404/index.html', to: 'dist/en/404.html' },
        ];

        paths.forEach(({ from, to }) => {
          if (fs.existsSync(from)) {
            fs.renameSync(from, to);
            fs.rmSync(path.dirname(from), { recursive: true, force: true });
          }
        });
      },
    },
    buildEnd() {
      try {
        const tempDir = path.resolve(__dirname, '.vite-ssg-temp');
        fs.rmSync(tempDir, { recursive: true, force: true });
        console.log(`Cleaned up: ${tempDir}`);
      } catch (err) {
        console.error('Error during cleanup:', err);
      }
    },
  };
});
