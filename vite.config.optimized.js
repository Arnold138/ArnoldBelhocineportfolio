import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react({
      // Optimiser React
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    }),
    // Compression Brotli (meilleure que gzip)
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      compressionOptions: { level: 11 }
    }),
    // Compression Gzip fallback
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024
    })
  ],
  build: {
    target: 'es2015',
    cssCodeSplit: true,
    sourcemap: false, // Désactiver en prod
    
    // Optimisation Rollup
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer les vendors
          'react-vendor': ['react', 'react-dom'],
          'lucide-icons': ['lucide-react'],
          // About section en chunk séparé
          'about-section': ['./src/components/AboutSection.jsx']
        },
        // Noms de fichiers optimisés
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'css/[name]-[hash].css'
          }
          return 'assets/[name]-[hash].[ext]'
        }
      }
    },
    
    // Minification aggressive
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        remove_unused: true,
        dead_code: true
      },
      mangle: {
        safari10: true
      }
    }
  },
  
  // Optimisations du serveur de dev
  server: {
    fs: {
      strict: false
    }
  },
  
  // CSS optimisations
  css: {
    devSourcemap: false,
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/variables.scss";'
      }
    }
  }
})