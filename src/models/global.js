const connection = require('../configs/db')

const global = {
  pagination: async (query) => {
    return new Promise((resolve, reject) => {
      console.log('query :>> ', query);
      connection.query(query, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    });
  }
}

module.exports = global