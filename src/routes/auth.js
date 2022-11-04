const { Router } = require('express')
const { db } = require('../firebase')


const auth = Router();

auth.post('/login', async (req, res) => {
    const {username, password} = req.body;
    console.log(username, " : ",password);
    if(!username || !password){
        res.status(400).send({error : 'Username o password no definidos'})
        return;
    }
    const object = await db.collection('users').where('username', '==', username).get();
    if(!object.docs.length){
        const user = {id : object.docs[0].id , ...object.docs[0].data()};



        res.status(200).send(user);
        return;
    }

    res.status(404).send({error : 'Usuario o contraseña inválidos'})
    
})

module.exports = auth;
