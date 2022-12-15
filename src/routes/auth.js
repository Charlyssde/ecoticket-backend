const { Router } = require('express')
const {login, newpassword} = require('../controllers/auth')
const auth = Router();

auth.post('/login',login)

auth.post('/newpassword/:id', newpassword)

module.exports = auth;
