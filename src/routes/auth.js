const { Router } = require('express')
const { db } = require('../firebase')
const bcrypt = require('bcrypt')
const {getAuth} = require("firebase-admin/auth");

const jwt = require('jsonwebtoken');
const verifyToken = require("../Middleware/validate-token");


const auth = Router();

const collection = 'users'

auth.post('/login', async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        res.status(400).send({error : 'Username o password no definidos'})
        return;
    }
    const object = await db.collection(collection).where('username', '==', username).get();
    if(object.docs.length){
        const user = {id : object.docs[0].id , ...object.docs[0].data()};
        const equals = await bcrypt.compare(password, user.password);
        if(equals){
            const userId = user.uid;
            getAuth().getUser(userId).then(async (result) => {
                const additionalClaims = {
                    username: user.username,
                    id : user.id,
                    authId : user.uid,
                    name: user.commercialName,
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

auth.post('/newpassword/:id', async(req, res) => {
    const id = req.params.id;
    const {currentPassword, newPassword} = req.body;
    const user = await db.collection(collection).doc(id).get();

    if(user.exists){
        let data = user.data();
        console.log("Data->", data)
        if(await bcrypt.compare(currentPassword, data.password))
            await db.collection(collection).doc(id).update({
                password : await bcrypt.hash(newPassword, 10)
            }).then(() => {
                getAuth().updateUser(data.uid, {password : newPassword}).then((userRedcord) => {
                    console.log("UserUpdated->", userRedcord)
                })
                res.status(200).json({message : true})
            }).catch((error) => {
                console.log("Error->", error)
                res.status(500).json({message : 'Ha ocurrido un error al actualizar la contraseña'})
            })
    }else{
        res.status(404).json({message : 'No se encontró el usuario'})
    }

})

module.exports = auth;
