const { Router } = require('express')
const { db } = require('../firebase')
const bcrypt = require('bcrypt')
const {getAuth} = require("firebase-admin/auth");

const jwt = require('jsonwebtoken');


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
        console.log(user);
        const equals = await bcrypt.compare(password, user.password);
        if(equals){

            /*
            * Create token from user FIREBASE
            * */
            // const userId = user.id;
            // const additionalClaims = {
            //     username: user.username,
            //     name : user.name,
            //     rol : user.role
            // };

            // const token = await getAuth().createCustomToken(userId, additionalClaims);

           // create 
            const userId = user.id;
            const token = await jwt.sign({
                username: user.username,
                name : user.name,
                rol : user.role
                
            },userId + process.env.TOKEN_SECRET)

            console.log("Token->", token);

            res.status(200).send({"token": token});
            return;
        }
    }
    res.status(404).send({error : 'Usuario o contraseña inválidos'})
    
})

module.exports = auth;
