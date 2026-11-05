module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm exec serve apps/web/out --listen 4174',
      startServerReadyPattern: 'Accepting connections',
      url: [
        'http://127.0.0.1:4174/',
        'http://127.0.0.1:4174/zh',
        'http://127.0.0.1:4174/es',
        'http://127.0.0.1:4174/fr',
        'http://127.0.0.1:4174/ar'
      ],
      numberOfRuns: 1,
      settings: { preset: 'desktop' }
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.98 }],
        'categories:best-practices': ['error', { minScore: 1 }],
        'categories:seo': ['error', { minScore: 1 }]
      }
    },
    upload: { target: 'filesystem', outputDir: './lighthouse-reports' }
  }
};
