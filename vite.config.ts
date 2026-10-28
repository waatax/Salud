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
          if (
            id.includes('src/data/cyclingData') ||
            id.includes('src/data/strengthData') ||
            id.includes('src/data/mobilityData') ||
            id.includes('src/data/sportsScienceData') ||
            id.includes('src/data/badmintonData') ||
            id.includes('src/data/tableTennisData') ||
            id.includes('src/data/pickleballData')
          ) {
            return 'salud-sports-data';
          }
          // v6.1: the 157 care pathways load only with the clinic hub; search uses a snapshot.
          if (id.includes('src/data/clinical') && !id.includes('searchLite.generated')) {
            return 'salud-clinic-data';
          }
          // v4.0: other data files are no longer forced into one eager 'salud-data'
          // chunk; Rollup splits them by importer so lazy hubs load their own data.
        },
      },
    },
  },
});
