const express = require('express')
const router = express.Router()

const usersController = require('../controllers/usersController')
const emailController = require('../controllers/emailController')
const authenticateToken = require('../middleware/authenticateToken')
const authorizationAdmin = require('../middleware/authorizationAdmin')
const authorizationUser = require('../middleware/authorizationUser')
const authorizationGeneral = require('../middleware/authorizationGeneral')
const { uploadMulter } = require('../middleware/uploadImage')
const sendEmail = require('../helpers/sendEmail')

const {
  getUsers,
  getUsersByFirstName,
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
  .post('/register', sendEmailVerification, insertUsers)
  .get('/search', getUsersByFirstName)
  .post('/login', userLogin)
  .post('/photo', uploadMulter.single('photo'), insertPhoto)
  .patch('/photo/:idUser', authenticateToken, authorizationUser, uploadMulter.single('photo'), updatePhoto)
  .post('/token', authorizationGeneral, newToken)
  .get('/:idUser', authenticateToken, authorizationAdmin, getUsersById)
  .post('/logout', authenticateToken, userLogOut)
  .patch('/:idUser', authenticateToken, authorizationUser, updateUsers)
  .delete('/:idUser', authenticateToken, authorizationAdmin, deleteUsers)

module.exports = router