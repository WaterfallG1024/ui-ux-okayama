import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  base: mode === 'submit'
    ? './'
    : '/',

  esbuild: {
    // 開発環境以外（本番ビルド時）は console と debugger をすべて削除
    drop: mode !== 'development' ? ['console', 'debugger'] : [],
  },

  build: {
    // 通常はdist
    outDir: mode === 'submit'
      ? 'dist-submit'
      : 'dist',
  },
}))
