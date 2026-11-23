import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Salud/',
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          // v6.14: sports data files are no longer forced into one 233 KB 'salud-sports-data'
          // chunk; Rollup splits each sport's data into its own lazy discipline chunk.
          // v6.2: clinical data is not grouped here. The clinic hub carries only the light index;
          // each department's pathways (src/data/clinical/pathways/*.json) are their own chunk.
          // v4.0: other data files are no longer forced into one eager 'salud-data'
          // chunk; Rollup splits them by importer so lazy hubs load their own data.
        },
      },
    },
  },
});
