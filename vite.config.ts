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
          if (id.includes('src/data/')) {
            return 'salud-data';
          }
        },
      },
    },
  },
});
