const verifyToken = require('../Middleware/validate-token');
const {Router} = require('express')
const {db} = require('../firebase')
const router = Router();
const {getAuth} = require("firebase-admin/auth");
const {getAllUsers, getOneUser, saveUser} = require("../controllers/users");

router.get('/user', getAllUsers);
router.get('/user/:id', getOneUser);
router.post('/user', saveUser);

router.delete('/user/:id', async(req, res) => {
    const doc = await db.collection("users").doc(req.params.id).get();
    console.log({
        id: doc.id,
        uid:  doc.uid,
        ...doc.data(),
    });

    const user = {id: doc.id,  ...doc.data(),}
    getAuth().deleteUser(user.uid).then(async () => {
            await db.collection('users').doc(user.id).delete();
            res.status(200).json({
            messege: 'Usuario eliminado correctamente',
            });
    }).catch((error) => {
        console.log(error)
        res.status(500).json({
            messege: 'Error al eliminar',
        });
    })
});

router.put('/user/:id',verifyToken, async(req, res) => {
    await db.collection('users').doc(req.params.id).update(req.body);

    res.status(200).json({
        messege: 'Usuario editado correctamente',
    });

});

router.get('/userid/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const data = await db.collection('users').where('sucursal', '==', id).get();
    const result = data.docs.map((d) => {
        return {id : d.id, ...d.data()}
    })
    res.status(200).json(result)
}); 

module.exports = router;