var env = require('dotenv').config()

module.exports = {
  NODE_ENV: '"production"',
  FIREBASE_CONF: JSON.stringify(env.parsed)
}
