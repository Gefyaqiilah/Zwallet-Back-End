const jwt = require('jsonwebtoken')
const createError = require('http-errors')
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    const error = new createError(401, 'Forbidden: Token cannot be empty')
    return next(error)
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
    if (!error) {
      req.user = user
      return next()
    } else {
      if (error.name === 'TokenExpiredError') {
        const error = new createError(401, 'Access Token expired')
        return next(error)
      } else if (error.name === 'JsonWebTokenError') {
        const error = new createError(401, 'Invalid Token')
        return next(error)
      }
    }
  })
}
module.exports = authenticateToken