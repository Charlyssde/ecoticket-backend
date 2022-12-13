const verifyToken = require('../Middleware/validate-token');
const {Router} = require('express')
const router = Router();
const {getAllUsers, getOneUser, saveUser, deleteUser, updateUser, findByQuery, testDecrypt} = require("../controllers/users");

router.get('/user', verifyToken, getAllUsers);
router.get('/user/:id', verifyToken, getOneUser);
router.post('/user', verifyToken, saveUser);
router.delete('/user/:id', verifyToken, deleteUser);
router.put('/user/:id', verifyToken, updateUser);
router.get('/userid/:id', verifyToken, findByQuery);
router.get('/crypt/:text', testDecrypt);

module.exports = router;