const {
  searchRoleId
} = require('../models/usersModel')
const responseHelpers = require('../helpers/responseHelpers')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')

function authorizationAdmin(req, res, next) {
  const refreshToken = req.body.token
 if(!refreshToken){
  const error = new createError(400, 'Forbidden')
  return next(error)
 }
  jwt.verify(refreshToken,process.env.REFRESH_TOKEN,(err,data)=>{
    if(!err){
      searchRoleId(data.id)
      .then(results => {
        const roleId = results[0].roleId
        if (roleId === 1||roleId===2) {
          return next()
        } else {
          const error = new createError(400, 'Forbidden')
          return next(error)
        }
      })
      .catch(() => {
        const error = new createError(500, 'Looks like server having trouble')
        return next(error)
      })
    }
  })
}

module.exports = authorizationAdmin