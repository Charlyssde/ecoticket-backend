const verifyToken = require('../Middleware/validate-token');
const {Router} = require('express')
const {db} = require('../firebase')
const bcrypt = require('bcrypt')
const moment = require('moment')
const router = Router();
const generateRandomText = require("../utils/generateRandomText");
const nodemailer = require('nodemailer');
const EmailAuth = require("../utils/email-auth");
const {getAuth} = require("firebase-admin/auth");

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
    const{ username, name, apellidouno, apellidodos, role, sucursal, correo} = req.body
    let password = generateRandomText();
    getAuth().createUser({
        email : correo,
        password : password,
        disabled : false,
        emailVerified : true,
        displayName : name
    }).then(async (userRecord) => {
        const hash = await bcrypt.hash(password, 10);
        await db.collection('users').add({
            uid : userRecord.uid,
            username,
            name,
            apellidouno,
            apellidodos,
            password:hash,
            role,
            correo,
            sucursal
        })
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

    contentHTML = `
    <h1>Credenciales de acceso ECOTICKET </h1>

    <p>Usuario: ${req.body.username}</p>
    <p>contraseña: ${password}</p>
    `;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: EmailAuth.email, // generated ethereal user
            pass: EmailAuth.password, // generated ethereal password
        },
    });

    await transporter.sendMail({
        from: `ECOTICKET <${EmailAuth.email}>`,
        to: req.body.correo,
        subject: 'CREDENCIALES ECOTICKET',
        html: contentHTML
    })

    res.status(201).json({
        messege: 'Usuario agregado correctamente',
    });
});

router.delete('/user/:id',verifyToken, async(req, res) => {
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