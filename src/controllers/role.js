const {db} = require('../firebase')

const collection = 'role'
exports.saverole = async (req, res) => {
    try {
        const data = await db.collection(collection).add(req.body)
        res.status(200).json({id : data.id, ...req.body})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Algo salio mal"})
    }
}

exports.getrolebyId = async (req, res) => {
    try {
        const data = await db.collection(collection).where('owner', '==', req.params.id).get();
        const result = data.docs.map((d) =>{
        return {id : d.id, ...d.data()}
    })
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Algo salio mal"})
    }
}

exports.updaterole = async (req, res) => {
    const id = req.params.id;
    db.collection(collection).doc(id).update(req.body).then((result) => {
        if(result.writeTime){
            res.status(200).json({id : id});
        }
    }).catch((error) => {
        console.log(error)
        res.status(500).json({message : 'Ha ocurrido un error al actualizar'})
    })
}

exports.deleteRole = async (req, res) => {
    const id = req.params.id;
    await db.collection(collection).doc(id).delete().then(() => {
        res.status(200).json({message : 'success'})
    }).catch((error) => {
        res.status(500).json({message : error})
    })
}