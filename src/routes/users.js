const {Router} = require('express')
const {db} = require('../firebase')
const bcrypt = require('bcrypt')
const router = Router();

router.get('/user', async (req, res) => {
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

router.post('/user', async (req, res) => {
    const{ username, name, password, phone, email, role } = req.body
   const hash = await bcrypt.hash(password, 10);
    await db.collection('users').add({
        username,
        name,
        hash,
        phone,
        email,
        role
    })
    console.log("Usuario agregado correctamente");
    res.status(201).json({
        body: {
            user: {username, name , phone, email, role}
        }
    });
});

router.delete('/user/:id', async(req, res) => {
    await db.collection('users').doc(req.params.id).delete();

    res.status(200).json({
        messege: 'Usuario eliminado correctamente',
    });
});

router.put('/user/:id', async(req, res) => {
    await db.collection('users').doc(req.params.id).update(req.body);

    res.status(200).json({
        messege: 'Usuario eliminado correctamente',
    });

});
module.exports = router;