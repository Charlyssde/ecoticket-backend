const {Router} = require('express')
const {saverole, getrolebyId, updaterole, deleteRole} = require('../controllers/role')
const {errorFunc} = require("express-fileupload/lib/utilities");

const role = Router();

role.post('/role', saverole)
role.get('/role/:id', getrolebyId)
role.put('/role/:id', updaterole)
role.delete('/role/:id', deleteRole)

module.exports = role;