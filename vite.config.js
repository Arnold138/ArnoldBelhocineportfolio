import { defineConfig } from 'vite';



export default defineConfig({
  // ...autres plugins...
  base: '/ArnoldBelhocineportfolio/',
  build: {
    outDir: 'docs',
    emptyOutDir: true
  }
});

