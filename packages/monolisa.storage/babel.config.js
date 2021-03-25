/**
 https://babeljs.io/docs/en/config-files check the monorepo section
 This config may not be needed for transpilation with --root-mode upward,
 but jest doesnt like it
 */
module.exports = require('../../babel.config')
