const verifyToken = require('../Middleware/validate-token');
const {Router} = require('express')
const {db} = require('../firebase')
const bcrypt = require('bcrypt')
const router = Router();

const jwt = require('jsonwebtoken');

router.get('/register', verifyToken, async (req, res) => {
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

router.get('/register/:id', verifyToken,  async(req, res) => {
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
        const{ additionalServices, businessName, commercialName, email, pac, passwordPac, password,  person, provider, username, userPac, role} = req.body
        const hash = await bcrypt.hash(password, 10);
        const result =  await db.collection('users').add({
            additionalServices,
            businessName,
            commercialName,
            email,
            pac,
            passwordPac,
            password:hash,
            person, 
            provider,
            username,
            userPac,
            role
        })
        const user = {id : result.id, ...req.body}

            const token = jwt.sign({
                username: user.username,
                name : user.commercialName,
                id: user.id,
                role: user.role
            },process.env.TOKEN_SECRET)

            console.log("Token->", token);

            res.status(201).send({"token": token});

});

router.delete('/register/:id', verifyToken, async(req, res) => {
    await db.collection('users').doc(req.params.id).delete();

    res.status(200).json({
        messege: 'Usuario eliminado correctamente',
    });
});

router.put('/register/:id', verifyToken, async(req, res) => {
    await db.collection('users').doc(req.params.id).update(req.body);

    res.status(200).json({
        messege: 'Usuario editado correctamente',
    });

});

module.exports = router;