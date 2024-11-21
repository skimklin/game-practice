import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [react(), vanillaExtractPlugin()],
})
