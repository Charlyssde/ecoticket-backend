const {Router} = require('express')
const {getvouchers, getvouchersByperson} = require('../controllers/vouchers')

const vauchers = Router();

vauchers.get('/vauchers', getvouchers); 
vauchers.get('/vauchers/:persona', getvouchersByperson); 






module.exports = vauchers;