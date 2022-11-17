const { Router } = require('express')
const { db } = require('../firebase')
const bcrypt = require('bcrypt')
const {getAuth} = require("firebase-admin/auth");

const jwt = require('jsonwebtoken');
const verifyToken = require("../Middleware/validate-token");


const auth = Router();

auth.post('/login', async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        res.status(400).send({error : 'Username o password no definidos'})
        return;
    }
    const object = await db.collection('users').where('username', '==', username).get();
    if(object.docs.length){
        const user = {id : object.docs[0].id , ...object.docs[0].data()};
        const equals = await bcrypt.compare(password, user.password);
        if(equals){
            const userId = user.id;
            getAuth().getUser(userId).then(async (result) => {
                const additionalClaims = {
                    username: user.username,
                    id : user.id,
                    name: user.name ? user.name : user.commercialName,
                    role: user.role
                };
                const token = await getAuth().createCustomToken(userId, additionalClaims);
                res.status(200).send({"token": token});
                res.end();
            }).catch((error) => {
                res.status(404).send({error : 'Usuario o contraseña inválidos'})
            })
        }else{
            res.status(404).send({error : 'Usuario o contraseña inválidos'})
        }
    }else{
        res.status(404).send({error : 'Usuario o contraseña inválidos'})
    }

})
module.exports = auth;
