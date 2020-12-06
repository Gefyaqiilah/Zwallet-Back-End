const connection = require('../configs/db')

class Model {
  constructor(){

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

  emailVerification(email){
    return new Promise((resolve,reject)=>{
      connection.query('UPDATE users SET emailStatus = 1 WHERE email = ?',email,(error,results)=>{
        if(!error){
          resolve(results)
        }else{
          reject(error)
        }
      })
    })
  }
}
const Email = new Model()
module.exports = Email