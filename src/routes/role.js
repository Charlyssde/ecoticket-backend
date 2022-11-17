const {Router} = require('express')
const {db} = require('../firebase')
const {errorFunc} = require("express-fileupload/lib/utilities");

const role = Router();

const collection = 'role'

role.post('/role', async (req, res) => {
    const data = await db.collection(collection).add(req.body)
    res.status(200).json({id : data.id, ...req.body})
})

role.get('/role/:id', async (req, res) => {

    const data = await db.collection(collection).where('owner', '==', req.params.id).get();
    const result = data.docs.map((d) =>{
        return {id : d.id, ...d.data()}
    })

    res.status(200).json(result)
})

role.put('/role/:id', async (req, res) => {
    const id = req.params.id;
    db.collection(collection).doc(id).update(req.body).then((result) => {
        if(result.writeTime){
            res.status(200).json({id : id});
        }
    }).catch((error) => {
        console.log(error)
        res.status(500).json({message : 'Ha ocurrido un error al actualizar'})
    })
})

role.delete('/role/:id', async (req, res) => {
    const id = req.params.id;
    await db.collection(collection).doc(id).delete().then(() => {
        res.status(200).json({message : 'success'})
    }).catch((error) => {
        res.status(500).json({message : error})
    })
})

module.exports = role;