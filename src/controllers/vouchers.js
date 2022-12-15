const {db} = require('../firebase')

exports.getvouchers =  async (req, res) => {
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
        res.status(500).json({message: "Algo salio mal"})
    }
}

exports.getvouchersByperson = async (req, res) => {
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
        res.status(500).json({message: "Algo salio mal"})
    }
}