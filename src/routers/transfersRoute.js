const express = require('express')
const router = express.Router()
const authenticateToken = require('../middleware/authenticateToken')
const authorizationAdmin = require('../middleware/authorizationAdmin')
const authorizationUser = require('../middleware/authorizationUser')
const transfersController = require('../controllers/transfersController')
// desctructuring class
const {
  getTransfers,
  getTransferById,
  insertTransfers,
  getTransactionByNameAndType,
  deleteTransfers
} = transfersController
router
  .get('/', getTransfers)
  .get('/search', getTransactionByNameAndType)
  .get('/:idTransfer', getTransferById)
  .post('/',authenticateToken, authorizationUser, insertTransfers)
  .delete('/:idTransfer', deleteTransfers)
module.exports = router