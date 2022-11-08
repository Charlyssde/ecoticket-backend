const verifyToken = require('../Middleware/validate-token');
const {Router} = require('express')
const {db} = require('../firebase')
const bcrypt = require('bcrypt')
const router = Router();

router.get('/register', async (req, res) => {
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

router.get('/register/:id', async(req, res) => {
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

router.post('/register', async (req, res) => {
    console.log(req.body.additionalServices)
    if(req.body.additionalServices == false){
        const{ additionalServices, businessName, commercialName, email, password, person, provider, username } = req.body
        const hash = await bcrypt.hash(password, 10);
        await db.collection('users').add({
            additionalServices,
            businessName,
            commercialName,
            email,
            password:hash,
            person, 
            provider,
            username,
        })
        console.log("Usuario agregado correctamente");
        res.status(201).json({
            body: {
                "messege": "Registro exitoso"
            }
            });
    }else{
        const{ additionalServices, businessName, commercialName, email, pac, passwordPac, password,  person, provider, username, userpac} = req.body
        const hash = await bcrypt.hash(password, 10);
        const hash1 = await bcrypt.hash(passwordPac, 10);
        await db.collection('users').add({
            additionalServices,
            businessName,
            commercialName,
            email,
            pac,
            passwordPac:hash1,
            password:hash,
            person, 
            provider,
            username,
            userpac
        })
        console.log("Usuario agregado correctamente");
        res.status(201).json({
            body: {
                "messege": "Registro exitoso"
            }
            });
    }
    
});

router.delete('/register/:id', async(req, res) => {
    await db.collection('users').doc(req.params.id).delete();

    res.status(200).json({
        messege: 'Usuario eliminado correctamente',
    });
});

router.put('/register/:id', async(req, res) => {
    await db.collection('users').doc(req.params.id).update(req.body);

    res.status(200).json({
        messege: 'Usuario editado correctamente',
    });

});

module.exports = router;