const {Router} = require('express')
const {db} = require('../firebase')

const vauchers = Router();

vauchers.get('/vauchers', async (req, res) => {
    try {
        const querySnapshot = await db.collection("vouchers").get();
        const vauchers = querySnapshot.docs.map(doc => ({
        id: doc.id,
            ...doc.data()
        }))
        res.status(200).json(
            vauchers    
        );
    } catch (e) {
        console.log(e);
        res.status(500).send("Algo Salio Mal!")
    }
}); 

vauchers.get('/vauchers/:persona', async (req, res) => {
    try {
        const querySnapshot = await db.collection('vouchers').where('persona', '==', req.params.persona).get();
        const vauchers = querySnapshot.docs.map(doc => ({
        id: doc.id,
            ...doc.data()
        }))
        res.status(200).json(
            vauchers    
        );
    } catch (e) {
        console.log(e);
        res.status(500).send("Algo Salio Mal!")
    }
}); 






module.exports = vauchers;