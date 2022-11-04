const { Router } = require('express')
const { db } = require('../firebase')


const auth = Router();

auth.post('/login', async (req, res) => {
    const {id} = req.body;
    const object = await db.collection('users').doc(id).get();
    console.log(object.data());
    if(object.data()){
        const user = {id : object.id , ...object.data()}
        console.log(user)

        

        res.status(200).send(user);

    }

    
})

module.exports = auth;