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

  build: {
    // 通常はdist
    outDir: mode === 'submit'
      ? 'dist-submit'
      : 'dist',
  },
}))
