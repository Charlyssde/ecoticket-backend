const {Router} = require('express')
const {db, storage} = require('../firebase')
const multer = require('multer')
const bcrypt = require("bcrypt");
const {hash} = require("bcrypt");

const upload = multer({storage: multer.memoryStorage()})

file = Router();

file.post('/file', upload.single('file'), async (req, res) => {
    const {collection, owner} = req.body;
    const {fieldname, originalname, enconding, mimetype, buffer} = req.file;
    const hashedName = await bcrypt.hash('secret', 2);
    const finalName = hashedName.substring(8,14) + '_' +  originalname;
    await storage.file(finalName).createWriteStream().end(buffer)

    let data = {};
    data[collection] = finalName;
    console.log(data)
    db.collection('stores').doc(owner).update(data).then(() => {
        res.status(200).json({result : true})
    }).catch((error) => {
        console.log(error)
        res.status(500).json({message : 'Ha ocurrido un error al tratar de guardar el documento'})
    });
})

module.exports = file;