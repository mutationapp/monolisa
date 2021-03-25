/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */

const { getmonolisaCandidates } = require('@monolisaapp/mutate')

const { files, mutate, page } = getmonolisaCandidates({
  MUTATE_STRATEGY: 'changed',
})

console.log(`mutate`, files, mutate)

module.exports = {
  files: files.length
    ? [
        '**/shared/*.ts',
        'packages/**/*.{ts,tsx}',
        // '__mocks__/**',
        'packages/**/*.{ts,json}',
        'babel.config.js',
        // 'test/helpers/*.js',
        'jest/**/*.js',
        '!packages/**/*.test.tsx',
        '!packages/**/*.test.ts',
        ...files,
      ]
    : [],
  mutate,
  testRunner: 'jest',
  reporters: ['progress', 'clear-text', 'html'],
  maxConcurrentTestRunners: 6,
  maxConcurrentTestRunners_comment:
    'Recommended to use about half of your available cores when running stryker with angular',
  coverageAnalysis: 'off',
  jest: {
    config: require('./jest.config.js'),
    enableFindRelatedTests: true,
  },
  htmlReporter: {
    baseDir: `reports/monolisa/html/${page}`,
  },
  mutator: 'typescript',
  tempDirName: `.stryker-tmp-${page}`,
}
