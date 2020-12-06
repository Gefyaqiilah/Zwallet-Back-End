const express = require('express')
const router = express.Router()
const emailController = require('../controllers/emailController')
const sendEmail = require('../helpers/sendEmail')
const {emailVerification,sendEmailVerification,checkIfEmailVerified} = emailController
router
.post('/sendemailverification',sendEmailVerification)
.patch('/emailverification',emailVerification)
.get('/checkEmailVerified',checkIfEmailVerified)
module.exports = router