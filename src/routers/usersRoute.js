const express = require('express')
const router = express.Router()

const usersController = require('../controllers/usersController')
const emailController = require('../controllers/emailController')
const authenticateToken = require('../middleware/authenticateToken')
const authorizationAdmin = require('../middleware/authorizationAdmin')
const authorizationUser = require('../middleware/authorizationUser')
const authorizationGeneral = require('../middleware/authorizationGeneral')
const {uploadMulter} = require('../middleware/uploadImage')
const sendEmail = require('../helpers/sendEmail')

const {
  getUsers,
  getUsersByNameAndPhoneNumber,
  updatePhoto,
  getUsersById,
  insertUsers,
  updateUsers,
  deleteUsers,
  userLogin,
  newToken,
  userLogOut,
  insertPhoto,
  sendEmailVerification
} = usersController

router
  .get('/', getUsers)
  .get('/search', getUsersByNameAndPhoneNumber)
  .post('/token', authorizationGeneral , newToken)
  .get('/:idUser', authenticateToken, authorizationUser, getUsersById)
  .post('/', sendEmailVerification, insertUsers)
  .post('/login', userLogin)
  .post('/logout', authenticateToken, userLogOut)
  .patch('/:idUser', authenticateToken, authorizationUser, updateUsers)
  .post('/photo', uploadMulter.single('photo'),insertPhoto)
  .patch('/photo/:idUser', uploadMulter.single('photo'), updatePhoto)
  .delete('/:idUser', authenticateToken, authorizationAdmin, deleteUsers)

module.exports = router