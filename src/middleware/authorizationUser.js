const {
  searchRoleId
} = require('../models/usersModel')
const responseHelpers = require('../helpers/responseHelpers')
const createError = require('http-errors')

function authorizationUser(req, res, next) {
  const id = req.user.id
  searchRoleId(id)
    .then(results => {
      const roleId = results[0].roleId
      if (roleId === 2) {
        return next()
      } else {
        responseHelpers.response(res, null, {
          status: 'forbidden',
          statusCode: 400
        }, {
          message: "Sorry, You don't have permission to access this endpoint"
        })
      }
    })
    .catch(() => {
      const error = new createError(500, 'Looks like server having trouble')
      return next(error)
    })
}

module.exports = authorizationUser