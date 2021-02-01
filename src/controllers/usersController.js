const bcrypt = require('bcrypt')
const {
  v4: uuidv4
} = require('uuid')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const responseHelpers = require('../helpers/responseHelpers')
const usersModel = require('../models/usersModel');
const fs = require('fs')
const sendEmail = require('../helpers/sendEmail')
const { pagination } = require('../helpers/pagination')


class Controllers {
  constructor() {
    this.userLogin = this.userLogin.bind(this)
    this.generateAccessToken = this.generateAccessToken.bind(this)
    this.generateRefreshToken = this.generateRefreshToken.bind(this)
    this.newToken = this.newToken.bind(this)
  }

  async getUsers(req, res, next) {
    const {
      page = 1, limit = 4, order = "ASC"
    } = req.query
    const offset = page ? (parseInt(page) - 1) * parseInt(limit) : 0

    const setPagination = await pagination(limit, page, "users", "users")

    usersModel.getUsers(limit, offset, order)
      .then(results => {
        const resultUsers = {
          pagination: setPagination,
          users: results
        }
        responseHelpers.response(res, resultUsers, {
          status: 'succeed',
          statusCode: 200
        }, null)
      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        return next(error)
      })
  }

  getUsersById(req, res, next) {
    const idUser = req.params.idUser
    const type = req.query.type
    usersModel.getUsersById(idUser, type)
      .then(results => {
        if (results.length === 0) {
          const error = new createError(404, `User not Found..`)
          next(error)
        } else {
          if (type === 'all') {
            const sendResults = results[0]
            delete sendResults.createdAt
            delete sendResults.updatedAt
            delete sendResults.password
            delete sendResults.roleId
            delete sendResults.pin
            responseHelpers.response(res, sendResults, {
              status: 'succeed',
              statusCode: 200
            }, null)
          } else {
            responseHelpers.response(res, results, {
              status: 'succeed',
              statusCode: 200
            }, null)
          }
        }
      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        return next(error)
      })
  }

  getUsersByFirstName(req, res, next) {
    const {
      firstName = ""
    } = req.query
    if (!firstName) {
      const error = new createError(404, `Firstname cannot empty`)
      return next(error)
    }

      usersModel.getUsersByFirstName(firstName)
        .then(results => {
          if (results.length === 0) {
            const error = new createError(404, `User not Found..`)
            return next(error)
          } else {
            responseHelpers.response(res, results, {
              status: 'succeed',
              statusCode: 200
            }, null)
          }
        })
        .catch(() => {
          const error = new createError(500, `Looks like server having trouble`)
          return next(error)
        })
  }

  userLogin(req, res, next) {
    const {
      email,
      password
    } = req.body

    usersModel.userLogin(email)
      .then(results => {
        if (results.length === 0) {
          const error = new createError(404, `Email or password you entered is incorrect.`)
          return next(error)
        } else {
          const userData = results[0]
          bcrypt.compare(password, userData.password, ((errorcrypt, resultscrypt) => {
            if (!errorcrypt) {
              if (resultscrypt) {
                usersModel.checkEmailStatus(email)
                .then(result=>{
                if(result[0].emailStatus=== 1){
                  const userDataToken = {
                    id: userData.id,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber,
                    phoneNumberSecond: userData.phoneNumberSecond,
                    balance: userData.balance,
                    photo: userData.photo,
                    pin: userData.pin?"exists":"not exists"
                  }
                  // function for generate token
                  const token = this.generateAccessToken(userDataToken)
                  const refreshToken = this.generateRefreshToken(userDataToken)
                  let tokenResponse = {
                    accessToken: token,
                    refreshToken
                  }
                  return responseHelpers.response(res, tokenResponse, {
                    status: 'Login Successful',
                    statusCode: 200
                  }, null)
                }  
                const error = new createError(401, 'email must be verified first, check the email we have sent')
                return next(error)
                })
                .catch()
              } else {
                const error = new createError(404, `Email or password you entered is incorrect.`)
                return next(error)      
              }
            }
          }))
        }
      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        return next(error)
      })
  }
  generateAccessToken(userData) {
    return jwt.sign(
      userData,
      process.env.ACCESS_TOKEN, {
      expiresIn: '24h'
    })
  }

  generateRefreshToken(userData) {
    return jwt.sign(userData, process.env.REFRESH_TOKEN)
  }

  newToken(req, res, next) {
    const refreshToken = req.body.token
    if (!refreshToken) {
      const error = new createError(500, `Forbidden: Token cannot be empty`)
      return next(error)
    }
    const verifyRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN)

    usersModel.getDataToken(verifyRefreshToken.email)
      .then(results => {
        const userData = results[0]
        const userDataToken = {
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          phoneNumberSecond: userData.phoneNumberSecond,
          balance: userData.balance,
          photo: userData.photo
        } 
        jwt.sign(userDataToken, process.env.ACCESS_TOKEN, {expiresIn: '1m'} ,  function (err, token) {
          return responseHelpers.response(res, {
            accessToken: token
          }, {
            status: 'Succeed',
            statusCode: 200
          }, null)
        });
      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        return next(error)
      })
  }

  insertUsers(req, res, next) {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      pin
    } = req.body
    if (!firstName || !email || !password) {
      const error = new createError(400, `firstName, email and password cannot be empty`)
      return next(error)
    }

    const id = uuidv4()

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (!hash) {
          const error = new createError(500, `Invalid password`)
          return next(error)
        }

        const data = {
          id,
          firstName,
          lastName,
          email,
          phoneNumber,
          password: hash,
          pin,
          balance: 0,
          createdAt: new Date(),
          updatedAt: null
        }

        usersModel.checkEmail(email)
          .then(results => {
            if (results.length > 0) {
              const error = new createError(409, `Forbidden: Email already exists. `)
              return next(error)
            }
            usersModel.insertUsers(data)
              .then(results => {
                responseHelpers.response(res, results, {
                  status: 'succeed',
                  statusCode: 200
                }, null)
              })
              .catch((err) => {
                console.log('err', err)
                const error = new createError(500, `Looks like server having trouble`)
                return next(error)
              })
          })
          .catch((err) => {
            console.log('err', err)
            const error = new createError(500, `Looks like server having trouble`)
            return next(error)
          })
      })
    })
  }

  sendEmailVerification(req, res, next) {
    const email = req.body.email
    const name = req.body.firstName
    if (!email || !name) {
      const error = new createError(404, 'Forbidden: message or email cannot be empty')
      return next(error)
    }

    sendEmail(email, name)
      .then(() => {
        return next()
      })
      .catch((err) => {
        console.log('err', err)
        const error = new createError(500, 'Looks like server having trouble..')
        return next(error)
      })
  }

  async checkPin (req, res, next) {
    const pin = req.body.pin
    const option = req.query.option
    console.log('pin', typeof pin)
    console.log('req.user.id', req.user.id)
    try {
      const result = await usersModel.checkPin(req.user.id, pin, option)
      if (option === 'checkexistpin') {
        let sendResult = ''
        if (result[0].pin) {
          sendResult = 'exist'
        } else {
          sendResult = 'not exist'
        }
        responseHelpers.response(res, sendResult, {
          status: 'succeed',
          statusCode: 200
        }, null)
      } else {
        if (result.length > 0) {
          responseHelpers.response(res, 'correct', {
            status: 'succeed',
            statusCode: 200
          }, null)
        } else {
          const error = new createError(404, 'Incorrect')
          return next(error)
        }
      }
    } catch (error) {
      res.json(error)
    }
  }

  updatePhoneNumber(req, res, next) {
    const {
      phoneNumber = null
    } = req.body
    const id = req.params.idUser
    if (!id || !phoneNumber) {
      const error = new createError(400, `Forbidden: Id or phone number cannot be empty`)
      return next(error)
    }

    usersModel.updatePhoneNumber(id, phoneNumber)
      .then(() => {
        const results = { message: "user phone number has been successfully updated" }
        responseHelpers.response(res, results, {
          status: 'Succeed',
          statusCode: 200
        }, null)
      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        return next(error)
      })
  }
  insertPhoto(req, res, next) {
    if (!req.file.filename) {
      const error = new createError(400, `Forbidden: Id or Photo cannot be empty`)
      return next(error)
    }
    const photo = `${process.env.BASE_URL}/photo/${req.file.filename}`
    usersModel.insertPhoto(photo)
      .then(() => {
        const results = { message: "user photo has been successfully added" }
        responseHelpers.response(res, results, {
          status: 'succeed',
          statusCode: 200
        }, null)
      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        return next(error)
      })
  }

  updatePhoto(req, res, next) {
    const id = req.params.idUser
    if (!id || !req.file.filename) {
      const error = new createError(400, `Forbidden: Id or Photo cannot be empty`)
      return next(error)
    }
    const photo = `${process.env.BASE_URL}/photo/${req.file.filename}`
    usersModel.getUsersById(id)
      .then(async results => {
        if (results.length === 0) {
          const error = new createError(404, `ID Not Found`)
          return next(error)
        }
        const dataResults = results[0]

        const oldImage = dataResults.photo
        if (oldImage) {
          const replaceString = oldImage.replace(`${process.env.BASE_URL}/photo/`, '')
          fs.unlink(`./uploads/${replaceString}`, err => {
            if (err) {
              const error = new createError(500, 'Failed to delete old photos')
              return next(error)
            }
          })
        }

        usersModel.updatePhoto(id, photo)
          .then(() => {
            const results = { message: "user photo has been successfully updated" }
            responseHelpers.response(res, results, {
              status: 'succeed',
              statusCode: 200
            }, null)
          })
          .catch(() => {
            const error = new createError(500, `Looks like server having trouble`)
            return next(error)
          })

      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        return next(error)
      })

  }
  async updatePin (req, res, next) {
    const pin = req.body.pin
    try {
      console.log('masuk')
      const result = await usersModel.updatePin(req.user.id, pin)
      responseHelpers.response(res, 'success', {
        status: 'succeed',
        statusCode: 200
      }, null)
    } catch (err) {
      console.log('err', err)
      const error = new createError(500, `Looks like server having trouble`)
      return next(error)
    }
  }

  updateUsers(req, res, next) {
    const idUser = req.params.idUser
    if (Object.keys(req.body).length === 0) {
      const error = new createError(400, `Forbidden: Nothing to update`)
      return next(error)
    }

    if (req.body.id || req.body.roleId || req.body.emailStatus || req.body.balance) {
      const error = new createError(400, `Forbidden: Cannot change id, roleId, emailStatus and balance`)
      return next(error)
    }
    const data = {
      ...req.body,
      updatedAt: new Date()
    }
    usersModel.updateUsers(idUser, data)
      .then(() => {
        const results = { message: "user data has been successfully updated" }
        responseHelpers.response(res, results, {
          status: 'succeed',
          statusCode: 200
        }, null)
      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        return next(error)
      })
  }

  deleteUsers(req, res, next) {
    const idUser = req.params.idUser
    usersModel.deleteUsers(idUser)
      .then(() => {
        const results = { message: "user has been successfully deleted" }
        responseHelpers.response(res, results, {
          status: 'succeed',
          statusCode: 200
        }, null)
      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        return next(error)
      })
  }
}
const Users = new Controllers()
module.exports = Users