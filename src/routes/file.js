const {Router} = require('express')
const {db, storage, getDownloadURL, ref } = require('../firebase')
const multer = require('multer')
const {uploadFile, downloadFile, testDecrypt} = require("../controllers/file");

const upload = multer({storage: multer.memoryStorage()})

file = Router();

file.post('/file', upload.single('file'),uploadFile)

file.post('/file-csf', upload.single('file'), uploadFile)

file.get('/download/:id', downloadFile)

file.get('/crypted/:id',testDecrypt)

module.exports = file;