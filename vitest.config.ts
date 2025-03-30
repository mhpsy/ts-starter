import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    ui: true,
  },
  plugins: [tsconfigPaths()],
})
