const connection = require('../configs/db')

class Models {
  getTransfers(limit, offset, order) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM transfers ORDER BY transferDate ${order} LIMIT ${offset},${limit}`, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
  getPinById(id){
    return new Promise((resolve, reject)=>{
      connection.query('SELECT pin FROM users WHERE id = ?', id, (error, results) => {
        if(!error){
          resolve(results)
        }else{
          reject(error)
        }
      })
    })
  }
  getTransferById(idTransfer) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM transfers WHERE idTransfer = ? ', idTransfer, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

  insertTransfers(data) {
    return new Promise((resolve, reject) => {
      // get balance user sender
      connection.query('SELECT balance FROM users WHERE id = ?', data.idSender, (errorSender, resultsSender) => {
        if(errorSender){
          reject('Looks like server having trouble')
        }
        if (resultsSender.length !== 0) {
          const senderBalance = resultsSender[0].balance
          if (senderBalance - data.amount > 0) {
            // get balance user receiver
            connection.query('SELECT balance FROM users WHERE id = ?', data.idReceiver, (errorReceiver, resultsReceiver) => {
              if (resultsReceiver.length !== 0) {
                const receiverBalance = JSON.parse(JSON.stringify(resultsReceiver[0]))
                const amount = parseInt(data.amount) + parseInt(receiverBalance.balance)
                // update for add up balance receiver
                connection.query('UPDATE users SET balance = ? WHERE id = ?', [amount, data.idReceiver], (errorUpdateBalance, resultsUpdateBalance) => {
                  if (!errorUpdateBalance) {
                    // update for reduce balance sender
                    const reduceBalanceSender = parseInt(senderBalance) - parseInt(data.amount)
                    connection.query('UPDATE users SET balance = ? WHERE id = ?', [reduceBalanceSender, data.idSender], (errorReduceBalanceSender, resultsReduceBalanceSender) => {
                      if (!errorReduceBalanceSender) {
                        // add transfer transaction to table transfer
                        connection.query('INSERT INTO transfers SET ?', data, (errorAddTransfer, resultsAddTransfer) => {
                          resolve(resultsAddTransfer)
                        })
                      } else {
                        reject(errorReduceBalanceSender)
                      }
                    })
                  } else {
                    reject(errorUpdateBalance)
                  }
                })
              } else {
                reject(new Error('ID Receiver not found'))
              }
            })
          } else {
            reject(new Error('Sender Balance is not enough for transfer'))
          }
        } else {
          reject(new Error('ID Sender not found'))
        }
      })
    })
  }

  getTransactionTransfers(firstName, limit, offset, order) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT transfers.idTransfer AS idTransfer, usersSender.firstName AS Sender,usersReceiver.photo as photo,usersReceiver.firstName as Receiver,transfers.amount,transfers.transferDate,transfers.notes FROM users as usersSender INNER JOIN transfers ON usersSender.id = transfers.idSender AND usersSender.firstName LIKE ? INNER JOIN users as usersReceiver ON usersReceiver.id = transfers.idReceiver ORDER BY transfers.transferDate ${order} LIMIT ${offset},${limit}`, [firstName], (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

  getTransactionReceiver(firstName, limit, offset, order) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT transfers.idTransfer AS idTransfer,usersSender.firstName AS Sender,usersReceiver.firstName AS receiver,transfers.amount,transfers.transferDate,transfers.notes FROM users AS usersReceiver INNER JOIN transfers ON usersReceiver.id = transfers.idReceiver AND usersReceiver.firstName LIKE ? INNER JOIN users AS usersSender ON usersSender.id = transfers.idSender ORDER BY transfers.transferDate ${order} LIMIT ${offset},${limit}`, [`%${firstName}%`], (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

  deleteTransfers(idTopUp) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM transfers WHERE idTransfer = ?', idTopUp, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

  getAllTransactionById (userId,limit, offset, ordered) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM transfers WHERE idSender IN ('${userId}') OR idReceiver IN ('${userId}') ORDER BY transferDate ${ordered} LIMIT ${offset},${limit}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    });
  }
}

const Transfers = new Models()
module.exports = Transfers