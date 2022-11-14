const {Router} = require('express')
const {db} = require('../firebase')

const store = Router();

store.get('/store/all/:id', async(req, res) => {
    const id = req.params.id;
    const data = await db.collection('stores').where('owner', '==', id).get();
    const result = data.docs.map((d) => {
        return {id : d.id, ...d.data()}
    })
    res.status(200).json(result)
})
store.get('/store/:id', async(req, res) => {
    const id = req.params.id;
    const data = await db.collection('stores').doc(id).get();
    if(data.exists){
        res.status(200).json({id : data.id, ...data.data()});
    }else{
        res.status(404).json({message : 'No se ha encontrado un elemento con el identificador ' + id})
    }
})
store.post('/store/', async (req, res) => {
    const {name, email, rfc, owner} = req.body;
    db.collection('stores').add({
        name,
        email,
        rfc,
        owner,
        toPay : 0,
        generatedTickets : 0,
        generatedInvoices : 0,
        nss : '',
        csdPassword : '',
        cert : '',
        key : '',
    }).then((resp) => {
        res.status(200).json(resp)
    }).catch(error => {
        res.status(500).json(error)
    })

})
store.put('/store/')

module.exports = store;