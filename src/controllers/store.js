const {db} = require('../firebase')

exports.getStore = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await db.collection('stores').where('owner', '==', id).get();
        const result = data.docs.map((d) => {
            return {id : d.id, ...d.data()}
        })
    res.status(200).json(result)
    } catch (e) {
        console.log(e);
        res.status(500).send("Algo Salio Mal!")
    }
}

exports.getStorebyId = async(req, res) => {
    const id = req.params.id;
    const data = await db.collection('stores').doc(id).get();
    if(data.exists){
        res.status(200).json({id : data.id, ...data.data()});
    }else{
        res.status(404).json({message : 'No se ha encontrado un elemento con el identificador ' + id})
    }
}

exports.getSaveStore = async (req, res) => {
    const {name, email, rfc, owner, toPay, generatedTickets, generatedInvoices, nss, csdPassword, cer, key} = req.body;
    db.collection('stores').add({
        name,
        email,
        rfc,
        owner,
        toPay,
        generatedTickets,
        generatedInvoices,
        nss,
        csdPassword,
        cer,
        key,
    }).then((resp) => {
        res.status(200).json(resp)
    }).catch(error => {
        res.status(500).json(error)
    })
}

exports.getPutStore = async (req, res) => {
    const id = req.params.id;
    const {name, email, rfc, owner, toPay, generatedTickets, generatedInvoices, nss, csdPassword} = req.body;
    await db.collection('stores').doc(id).update({
        name,
        email,
        rfc,
        owner,
        toPay,
        generatedTickets,
        generatedInvoices,
        nss,
        csdPassword,
    }).then((data) => {
        if(data.writeTime){
            res.status(200).json({id : id});
        }
    }).catch((error) => {
        res.status(500).json({message : 'No se ha encontrado un elemento con el identificador ' + id})
    });
}

exports.getdeleteStore = async (req, res) => {
    const id = req.params.id;
    await db.collection('stores').doc(id).delete().then(() => {
        res.status(200).json({message : 'success'})
    }).catch((error) => {
        res.status(500).json({message : error})
    })
}