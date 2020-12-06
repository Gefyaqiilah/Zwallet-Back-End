const connection = require('../configs/db')

class Models {
  getTopUp(limit, offset, order) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM topup ORDER BY topUpDate ${order} LIMIT ${offset},${limit}`, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

  getTopUpById(idTransfer) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM topup WHERE idTopUp = ?', idTransfer, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

  getTopUpByFirstName(firstName, limit, offset, order) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT topup.senderName, users.firstName AS receiverUsername ,topup.amount, topup.topUpDate, topup.notes FROM users INNER JOIN topup ON users.id = topup.idReceiver AND users.firstName LIKE ? ORDER BY topup.topUpDate ${order} LIMIT ${offset},${limit}`, firstName, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

  insertTopUp(data) {
    return new Promise((resolve, reject) => {
      console.log(data.idReceiver)
      connection.query('SELECT balance FROM users WHERE id = ?', data.idReceiver, (error, results) => {
        if (!error) {
          const balanceAmount = parseInt(JSON.parse(JSON.stringify(results[0].balance))) + parseInt(data.amount)
          connection.query('UPDATE users SET balance = ? WHERE id = ?', [balanceAmount, data.idReceiver], (errorUpdateBalance, resultsUpdateBalance) => {
            if (!errorUpdateBalance) {
              connection.query('INSERT INTO topup SET ?', data, (errorAddTopUp, resultsaddTopUp) => {
                if (!errorAddTopUp) {
                  resolve(resultsaddTopUp)
                } else {
                  reject(errorAddTopUp)
                }
              })
            } else {
              reject(errorUpdateBalance)
            }
          })
        } else {
          reject(error)
        }
      })
    })
  }

  deleteTopUp(idTopUp) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM topup WHERE idTopUp = ?', idTopUp, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}
const TopUp = new Models()
module.exports = TopUp