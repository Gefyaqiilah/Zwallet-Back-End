module.exports = {
  response: (res, result, status, err) => {
    const resultPrint = {}
    resultPrint.status = status.status 
    resultPrint.statusCode = status.statusCode
    resultPrint.result = result
    resultPrint.err = err || null
    return res.status(resultPrint.statusCode).json(resultPrint)
  }
}