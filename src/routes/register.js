const verifyToken = require('../Middleware/validate-token');
const {Router} = require('express')
const {db} = require('../firebase')
const bcrypt = require('bcrypt')
const router = Router();

const jwt = require('jsonwebtoken');
const {getAuth} = require("firebase-admin/auth");

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

router.get('/register/:id', verifyToken, async (req, res) => {
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
    const {additionalServices,businessName,commercialName,email,pac,passwordPac,password,person,provider,username,userPac, role} = req.body

    getAuth().createUser({
        email : email,
        password : password,
        disabled : false,
        emailVerified : true,
        displayName : commercialName
    }).then(async (userRecord) => {
        const hash = await bcrypt.hash(password, 10);
        const result = await db.collection('users').add({
            uid : userRecord.uid,
            additionalServices,
            businessName,
            commercialName,
            email,
            pac,
            passwordPac,
            password: hash,
            person,
            provider,
            username,
            userPac,
            role
        })
        const user = {id: result.id, uid : userRecord.uid, ...req.body}
        let validRoles = [user.role];
        if(user.role !== 'owner'){
            const role = await db.collection('role').doc(user.role).get();
            let rol = role.data();
            let keys = Object.keys(rol);
            validRoles = keys.filter((key) =>  rol[key] === true )
        }
        const additionalClaims = {
            username: user.username,
            id : user.id,
            authId : user.uid,
            name: user.commercialName,
            role: validRoles,
            sucursal : user.sucursal ? user.sucursal : 'none'
        };
        const token = await getAuth().createCustomToken(user.uid, additionalClaims);
        res.status(200).send({
            "token": token,
            "id":  user.id
        });
        res.end();
    }).catch((error) => {
        let message = '';
        const m = error.errorInfo.code;
        if(m === 'auth/email-already-exists'){
            message = 'El correo ya ha sido registrado';
        }else{
            message = 'Error desconocido'
        }
        console.log(error.errorInfo)
        res.status(500).json({message : message})
    })
});

router.delete('/register/:id', verifyToken, async (req, res) => {
    await db.collection('users').doc(req.params.id).delete();

    res.status(200).json({
        messege: 'Usuario eliminado correctamente',
    });
});

router.put('/register/:id', verifyToken, async (req, res) => {
    await db.collection('users').doc(req.params.id).update(req.body);

    res.status(200).json({
        messege: 'Usuario editado correctamente',
    });

});

router.get('/test', verifyToken, (req, res) => {
    res.send('all ok')
})

module.exports = router;