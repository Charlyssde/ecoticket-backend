const User = require("../models/users");
const generateRandomText = require("../utils/generateRandomText");
const {getAuth} = require("firebase-admin/auth");
const bcrypt = require("bcrypt");
const {db} = require("../firebase");
const nodemailer = require("nodemailer");
const EmailAuth = require("../utils/email-auth");

exports.getAllUsers = async function (req, res) {
    try {
        const querySnapshot = await User.getAll('users')
        const user = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        res.status(200).json(user);
    } catch (e) {
        console.log(e);
        res.status(500).send("Algo Salio Mal!")
    }
}

exports.getOneUser = async function (req, res) {
    const doc = await User.getOne()
    res.status(200).json({id: doc.id,...doc.data()})
}

exports.saveUser = async function async (req, res) {
    const{ username, name, apellidouno, apellidodos, role, sucursal, correo} = req.body
    let password = generateRandomText();
    User.saveUser(username, name, apellidouno, apellidodos, role, sucursal, correo, password).then(() => {
        res.status(201).json({message: 'Usuario agregado correctamente'});
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
}