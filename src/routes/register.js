const verifyToken = require('../Middleware/validate-token');
const {Router} = require('express')

const router = Router();


const {getregister, getregisterbyid, saveregister, deleteregister, updateregister} = require("../controllers/register");

router.get('/register', verifyToken, getregister);
router.get('/register/:id', verifyToken ,getregisterbyid);
router.post('/register', saveregister);
router.delete('/register/:id', verifyToken ,deleteregister );

router.put('/register/:id', verifyToken, updateregister);

router.get('/test', verifyToken, (req, res) => {
    res.send('all ok')
})

module.exports = router;