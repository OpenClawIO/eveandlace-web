import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/store-sync.ts', 'src/worker.ts'],
      reporter: ['text', 'json-summary'],
      thresholds: {
        lines: 90,
        functions: 90,
        statements: 90,
        branches: 80
      }
    }
  }
});
