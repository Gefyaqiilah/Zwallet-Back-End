const express = require('express')
const router = express.Router()
const topUpController = require('../controllers/topUpController')
const authenticateToken = require('../middleware/authenticateToken')
const authorizationAdmin = require('../middleware/authorizationAdmin')
const authorizationUser = require('../middleware/authorizationUser')
const {
  getTopUp,
  getTopUpById,
  getTopUpByFirstName,
  deleteTopUp,
  insertTopUp
} = topUpController
router
  .get('/', getTopUp)
  .delete('/:idTopUp', authenticateToken, authorizationUser, deleteTopUp)
  .get('/search', authenticateToken, authorizationUser, getTopUpByFirstName)
  .get('/:idTopUp', authenticateToken, authorizationAdmin, getTopUpById)
  .post('/', authenticateToken, authorizationAdmin, insertTopUp)
module.exports = router