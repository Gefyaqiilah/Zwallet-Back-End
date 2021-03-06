const {
  searchRoleId
} = require('../models/usersModel')
const responseHelpers = require('../helpers/responseHelpers')
const createError = require('http-errors')

function authorizationAdmin(req, res, next) {
  const id = req.user.id
  searchRoleId(id)
    .then(results => {
      const roleId = results[0].roleId
      if (roleId === 1) {
        return next()
      } else {
        const error = new createError(400, "Sorry, You don't have permission to access this endpoint")
        return next(error)
      }
    })
    .catch(() => {
      const error = new createError(500, 'Looks like server having trouble')
      return next(error)
    })
}

module.exports = authorizationAdmin