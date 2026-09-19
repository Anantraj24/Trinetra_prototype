import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

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
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
})
