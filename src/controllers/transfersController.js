const {
  v4: uuidv4
} = require('uuid')
const { pagination } = require('../helpers/pagination')
const createError = require('http-errors')
const transfersModel = require('../models/transfersModel')
const responseHelpers = require('../helpers/responseHelpers')

class Controller {
  async getTransfers(req, res, next) {
    const {
      page = 1, limit = 2, order = "DESC"
    } = req.query
    const ordered = order.toUpperCase()
    const offset = page ? (parseInt(page) - 1) * parseInt(limit) : 0;
    const setPagination = await pagination(limit, page, "transfers", "transfers")
    transfersModel.getTransfers(limit, offset, ordered)
      .then(results => {
        const resultTransfers = {
          pagination: setPagination,
          transfers: results
        }
        responseHelpers.response(res, resultTransfers, {
          status: 'succeed',
          statusCode: 200
        }, null)
      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        return next(error)
      })
  }

  getTransferById(req, res, next) {
    const idTransfer = req.params.idTransfer
    transfersModel.getTransferById(idTransfer)
      .then(results => {
        if (results.length === 0) {
          const error = new createError(500, `Data Transfer User with ID :${idTransfer} not Found..`)
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

  insertTransfers(req, res, next) {
    const {
      idSender,
      idReceiver,
      amount,
      notes = ''
    } = req.body
    const idTransfer = uuidv4()
    const data = {
      idTransfer,
      idSender,
      idReceiver,
      amount,
      notes,
      transferDate: new Date()
    }
    transfersModel.insertTransfers(data)
      .then(() => {
        const results = { message: "transfer successfully" }
        responseHelpers.response(res, results, {
          status: 'transfer succeed',
          statusCode: 200
        }, null)
      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        return next(error)
      })
  }

  getTransactionByNameAndType(req, res, next) {
    const {
      firstName,
      type = 'transfers',
      page = 1,
      limit = '2',
      order = "DESC"
    } = req.query
    const offset = page ? (parseInt(page) - 1) * parseInt(limit) : 0;
    const ordered = order.toUpperCase()
    if (type === 'transfers') {
      transfersModel.getTransactionTransfers(firstName, limit, offset, ordered)
        .then(results => {
          if (results.length === 0) {
            const error = new createError(204, `Data not found`)
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
    } else if (type === 'receiver') {
      transfersModel.getTransactionReceiver(firstName, limit, offset, ordered)
        .then(results => {
          if (results.length === 0) {
            const error = new Error(`Data Transfer User with firstName :${firstName} not Found..`)
            error.statusCode = 500
            error.status = 'failed'
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
    } else {
      const error = new createError(500, `data type ${type} not found ..`)
      return next(error)
    }
  }

  deleteTransfers(req, res, next) {
    const idTransfer = req.params.idTransfer
    transfersModel.deleteTransfers(idTransfer)
      .then(() => {
        const results = { message: "Transfer has been successfully deleted" }
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
const Transfers = new Controller()
module.exports = Transfers