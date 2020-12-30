const { libs } = require('../../babel.config')

const withTM = require('next-transpile-modules')(libs)
module.exports = withTM()
