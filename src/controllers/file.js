const bcrypt = require("bcrypt");
const {saveFile, getUrlFile} = require("../models/storage");
const {updateUser, getOne} = require("../models/users");
const {db, storage} = require("../firebase");

exports.uploadFile = async (req, res) => {
    try{
        const {collection, owner, route} = req.body;
        const {originalname, buffer} = req.file;
        const hashedName = await bcrypt.hash('secret', 2);
        const finalName = (hashedName.substring(8, 14) + '_' + originalname).replace("//", "x");
        await saveFile(finalName, buffer);

        let data = {};
        data[collection] = finalName;

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