const createError = require('http-errors')
const sendEmail = require('../helpers/sendEmail')
const emailModel = require('../models/emailModel')
const responseHelpers = require('../helpers/responseHelpers')

class Controller {

  sendEmailVerification (req,res,next) {
    const email = req.body.email
    const name = req.body.name
    console.log('masuk send')
    if(!email||!name){
      const error = new createError(404, 'Forbidden: message and email cannot be empty')
      return next(error)
    }

    sendEmail(email,name)
    .then(results=>{
      return responseHelpers.response(res, results, {
        status: 'succeed',
        statusCode: 200
      }, null)
    })
    .catch(()=>{
      const error = new createError(500,'Looks like server having trouble..')
      return next(error)
    })
  }

  emailVerification(req,res,next){
    const email = req.body.email
    console.log(req.body)
    if(!email){
      const error = new createError(400,'email cannot empty')
      return next(error)
    }
    emailModel.checkEmailStatus(email)
    .then(results=>{
      const emailStatus = results[0].emailStatus
      if(emailStatus === 1){
        const error = new createError(404, 'Forbidden')
        return next(error)
      }else if(emailStatus === 0){
        emailModel.emailVerification(email)
        .then(exist=>{
          console.log(exist)
          const message = {message: 'your email was successfully verified'}
          return responseHelpers.response(res,message,{status:'Succeedd',statusCode:200},null)
        })
        .catch(()=>{
          const error = new createError(500, 'Looks like server having trouble')
          return next(error)
        })
      }
    })
    .catch(()=>{
      const error = new createError(500, 'Looks like server having trouble..')
      return next(error)
    })
  }

  checkIfEmailVerified(req,res,next){
    const email = req.headers.email
    emailModel.checkEmailStatus(email)
    .then(results=>{
      if(results[0].length === 0){
        const error = new createError(404, 'Forbidden: You are not user')
        return next(error)
      }
      if(results[0].emailStatus === 1){
        const error = new createError(404, 'Forbidden: Your account has been verified')
        return next(error)
      }
      const message = {message: 'your account can be verified'}
      return responseHelpers.response(res,message,{status:'Succeedd',statusCode:200},null)
    })
    .catch(()=>{
      const error = new createError(500, 'Looks like server having trouble..')
      return next(error)
    })
  }
}
const Email = new Controller()
module.exports = Email