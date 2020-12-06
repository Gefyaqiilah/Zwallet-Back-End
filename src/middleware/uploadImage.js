const multer = require('multer')
const path = require('path')
const responseHelpers = require('../helpers/responseHelpers')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const limit = {
  fileSize: 3 * 1000000
}

function fileFilter(req, file, cb) {
  const extName = path.extname(file.originalname)

  if (extName === '.jpg' || extName === '.jpeg' || extName === '.gif' || extName === '.png') {
    // To accept the file pass `true`, like so:
    cb(null, true)
  }else{
    // To reject this file pass `false`,or give just error like so:
    cb(new Error('Rejected: File accepted only JPG, JPEG, GIF & PNG.'))
  }
}
const upload = multer({
  fileFilter: fileFilter,
  storage: storage,
  limits: limit
})

module.exports = {
  uploadMulter: upload
}