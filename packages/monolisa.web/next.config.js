const { libs } = require('../../monolisa.config')

const withTM = require('next-transpile-modules')(libs)
module.exports = withTM()
