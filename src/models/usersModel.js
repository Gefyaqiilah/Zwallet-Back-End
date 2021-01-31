const connection = require('../configs/db')
class Models {
  getUsers(limit, offset, order) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT id, firstName, lastName, email, phoneNumber, photo FROM users ORDER BY createdAt ${order} LIMIT ${offset},${limit}`, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
  countUsers(table) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT COUNT(*) as totalData FROM ${table}`, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
  getUsersById(id, type) {
    return new Promise((resolve, reject) => {
      if (type === 'all') {
        connection.query('SELECT * FROM users WHERE id = ?', id, (error, results) => {
          if (!error) {
            resolve(results)
          } else {
            reject(error)
          }
        })
      } else {
        connection.query('SELECT id, firstName, lastName, email, phoneNumber, photo FROM users WHERE id = ?', id, (error, results) => {
          if (!error) {
            resolve(results)
          } else {
            reject(error)
          }
        })
      }
    })
  }

  getUsersByFirstName(firstName) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT id, firstName, lastName, phoneNumber, email, photo FROM users WHERE firstName LIKE ?', [`%${firstName}%`], (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
  insertPhoto(photo) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO post_image SET photo = ?', photo, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
  updatePhoto(id, photo) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET photo = ? WHERE id = ?', [photo, id], (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
  insertUsers(data) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', data, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

  checkEmail(email) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT email FROM users WHERE email = ?', email, ((error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      }))
    })
  }
  checkEmailStatus(email){
    return new Promise((resolve,reject)=>{
      connection.query('SELECT emailStatus FROM users WHERE email = ?',email,(error,results)=>{
        if(!error){
          resolve(results)
        }else{
          reject(error)
        }
      })
    })
  }
  getDataToken(email) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT id, email, firstName, lastName, phoneNumber,phoneNumberSecond, password, balance, photo FROM users WHERE email = ?', email, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
  userLogin(email) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT id, email, firstName, lastName, phoneNumber,phoneNumberSecond,pin, password, balance, photo from users WHERE email = ?', email, ((error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      }))
    })
  }
  updatePhoneNumber(id, phoneNumber) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET phoneNumber = ? WHERE id= ?', [phoneNumber, id], (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject('wooo')
        }
      })
    })
  }
  updateUsers(id, data) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET ? WHERE id = ?', [data, `${id}`], (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
  searchRoleId(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT roleId FROM users WHERE id = ?', id, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
  deleteUsers(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM users WHERE id = ?', id, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}
const Users = new Models()
module.exports = Users