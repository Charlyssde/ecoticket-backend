const verifyToken = require('../Middleware/validate-token');
const {Router} = require('express')
const {db} = require('../firebase')
const bcrypt = require('bcrypt')
const moment = require('moment')
const router = Router();

router.get('/user', verifyToken, async (req, res) => {
    try {
        const querySnapshot = await db.collection("users").get();
        const user = querySnapshot.docs.map(doc => ({
        id: doc.id,
            ...doc.data()
        }))
        console.log(user);
        res.status(200).json(
            user    
        );
    } catch (e) {
        console.log(e);
        res.status(500).send("Algo Salio Mal!")
    }
}); 

router.get('/user/:id', async(req, res) => {
    const doc = await db.collection("users").doc(req.params.id).get();

    console.log({
        id: doc.id,
        ...doc.data(),
    });

  res.status(200).json({
    id: doc.id,
    ...doc.data(),
  })
});

router.post('/user',verifyToken, async (req, res) => {
    const{ username, name, apellidouno, apellidodos, password, permiso, role, sucursal} = req.body
    const hash = await bcrypt.hash(password, 10);
   let currentDate = moment().format('YYYY-MM-DD')
    await db.collection('users').add({
        username,
        name,
        apellidouno,
        apellidodos,
        password:hash,
        permiso,
        role,
        fecha : currentDate,
        sucursal
    })
    console.log("Usuario agregado correctamente");
    res.status(201).json({
        messege: 'Usuario agregado correctamente',
    });
});

router.delete('/user/:id',verifyToken, async(req, res) => {
    await db.collection('users').doc(req.params.id).delete();

    res.status(200).json({
        messege: 'Usuario eliminado correctamente',
    });
});

router.put('/user/:id',verifyToken, async(req, res) => {
    await db.collection('users').doc(req.params.id).update(req.body);

    res.status(200).json({
        messege: 'Usuario editado correctamente',
    });

});

router.get('/userid/:id', verifyToken, async (req, res) => {
    
}); 

module.exports = router;