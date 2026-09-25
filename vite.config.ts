import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function stripVersionPlugin() {
  return {
    name: 'strip-version-plugin',
    enforce: 'pre' as const,
    resolveId(source: string, importer?: string) {
      const match = source.match(/^((?:@[^/]+\/)?[^@/]+)@[\d.]+(.*)$/)
      if (match) {
        const cleanSource = match[1] + (match[2] || '')
        return this.resolve(cleanSource, importer, { skipSelf: true })
      }
    },
  }
}

export default defineConfig({
  plugins: [
    stripVersionPlugin(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
})
