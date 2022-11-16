const {Router} = require('express')
const {db} = require('../firebase')

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


module.exports = role;