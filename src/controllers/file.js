const {getUrlFile} = require("../models/storage");
const {updateUser, getOne, findByQuery} = require("../models/users");
const {Crypt} = require("../utils/crypt");

exports.uploadFile = async (req, res) => {
    try{
        const {collection, owner, route} = req.body;
        const base64 = req.file.buffer.toString("base64");
        const encrypted = Crypt(base64)

        let data = {};
        data[collection] = encrypted;
        data[collection + '_name'] = req.file.originalname;

        await updateUser(route, owner, data);
        res.status(200).json({message : 'ok'});
    }catch (e){
        console.log("Error->", e);
        res.status(500).json({error: e});
    }

}

exports.downloadFile = async (req, res) => {
    try{
        const id = req.params.id;
        const doc = await getOne('users',id)
        const user = {id: doc.id,  ...doc.data(),}
        const url =  await getUrlFile(user.cfdi)
        res.status(200).json(url[0])
    }catch (e){
        console.log("Error->", e);
        res.status(500).json({message : e})
    }

}
exports.testDecrypt = async (req, res) => {
    try{
        const id = req.params.id;
        const doc = await findByQuery('stores', 'rfc', '==', id);
        if(!doc.docs[0]){
            res.status(400).json({message: 'No encontrado'})
            return
        }
        const store = {id : doc.docs[0].id, ...doc.docs[0].data()}

        res.status(200).json({cer : store.cer, key : store.key});
    }catch (e){
        console.log("Error->", e)
        res.status(500).json({message : e})
    }
}