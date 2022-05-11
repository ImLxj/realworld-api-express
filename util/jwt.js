const jwt = require('jsonwebtoken')
const { promisify } = require('util')

exports.sing = promisify(jwt.sign)

exports.verify = promisify(jwt.verify)