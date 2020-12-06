const {
  v4: uuidv4
} = require('uuid')
const createError = require('http-errors')
const topUpModel = require('../models/topUpModel')
const responseHelpers = require('../helpers/responseHelpers')

class Controller {
  getTopUp(req, res, next) {
    const {
      page = 1, limit = 2, order = "DESC"
    } = req.query
    const ordered = order.toUpperCase()
    const offset = page ? (parseInt(page) - 1) * parseInt(limit) : 0;

    topUpModel.getTopUp(limit, offset, ordered)
      .then(results => {
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

  getTopUpById(req, res, next) {
    const idTopUp = req.params.idTopUp
    topUpModel.getTopUpById(idTopUp)
      .then(results => {
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

  getTopUpByFirstName(req, res, next) {
    const {
      firstName,
      page = 1,
      limit = 2,
      order = "DESC"
    } = req.query

    const ordered = order.toUpperCase()

    const offset = page ? (parseInt(page) - 1) * parseInt(limit) : 0;
    topUpModel.getTopUpByFirstName(firstName, limit, offset, ordered)
      .then(results => {
        if (results.length === 0) {
          const error = new createError(404, `Data TopUp User with firstName :${firstName} not Found..`)
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

  insertTopUp(req, res, next) {
    const {
      idReceiver,
      senderName = '',
      amount,
      notes = ''
    } = req.body
    const idTopUp = uuidv4()
    const data = {
      idTopUp,
      idReceiver,
      senderName,
      amount,
      notes,
      topUpDate: new Date()
    }
    topUpModel.insertTopUp(data)
      .then(results => {
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

  deleteTopUp(req, res, next) {
    const idTopUp = req.params.idTopUp
    topUpModel.deleteTopUp(idTopUp)
      .then(results => {
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
const TopUp = new Controller()
module.exports = TopUp