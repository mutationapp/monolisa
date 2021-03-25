const libs = [
  'monolisa.api',
  'monolisa.data',
  'monolisa.integration',
  'monolisa.lib',
  'monolisa.model',
  'monolisa.web',
  'monolisa.storage',
]

const { NODE_ENV } = process.env

const alias = libs.reduce((acc, lib) => {
  return {
    ...acc,
    [`^${lib}/(.+)`]: ([, name]) => {
      const src = name.replace(/^src/g, 'dist')

      return `${lib}/dist/${src.replace(/^dist/g, '')}`
    },
  }
}, {})

// https://babeljs.io/docs/en/7.5.0/configuration#babelconfigjs
module.exports =
  NODE_ENV === 'test'
    ? {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: 'current',
              },
            },
          ],
          '@babel/preset-typescript',
        ],
      }
    : {
        presets: ['next/babel', '@babel/preset-typescript'],
        plugins: [
          [
            // ⌐╦╦═─ ISSUE: Module path maps are not resolved in emitted code, https://github.com/microsoft/TypeScript/issues/10866
            // https://github.com/tleunen/babel-plugin-module-resolver/blob/master/DOCS.md
            // Alternative https://arunmichaeldsouza.com/blog/aliasing-module-paths-in-node-js
            'module-resolver',
            {
              root: ['.'],
              alias,
            },
          ],
        ],
        ignore: [
          /node_modules/,
          ...['test', 'spec']
            .map(ext => `**/*.${ext}.ts`)
            .reduce((acc, file) => acc.concat([file, `${file}x`]), [])
            .concat(['**/__tests__', '**/__specs__']),
        ],
      }
