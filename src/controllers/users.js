const generateRandomText = require("../utils/generateRandomText");
const {sendMail} = require("./mail");
const {deleteAuth} = require("../models/auth");
const {db} = require("../firebase");
const {Crypt, Decrypt} = require("../utils/crypt");
const {getAll, getOne, saveUser, deleteUser, findByQuery, updateUser} = require("../models/users");

exports.getAllUsers = async (req, res) => {
    try {
        const querySnapshot = await getAll('users')
        const user = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        res.status(200).json(user);
    } catch (e) {
        console.log(e);
        res.status(500).send("Algo Salio Mal!")
    }
}

exports.getOneUser = async (req, res) => {
    const doc = await getOne('users',req.param.id)
    res.status(200).json({id: doc.id, ...doc.data()})
}

exports.saveUser =  async(req, res) => {
    const {username, name, apellidouno, apellidodos, role, sucursal, correo} = req.body
    let password = generateRandomText();
    try {
        await saveUser(username, name, apellidouno, apellidodos, role, sucursal, correo, password);
        await sendMail(req, password);
        res.status(200).json({message : 'Ok'})
    } catch (e) {
        let message = '';
        const m = e.errorInfo.code;
        if (m === 'auth/email-already-exists') {
            message = 'El correo ya ha sido registrado';
        } else {
            message = 'Error desconocido'
        }
        res.status(500).json({message: message})
    }
}

exports.deleteUser = async(req, res) => {
    try{
        const doc = await User.getOne('users', req.params.id);
        const user = {id: doc.id,  ...doc.data()}
        await deleteAuth(user);
        await deleteUser('users', user.id)
        res.status(200).json({message: 'Usuario eliminado correctamente',});
    }catch (e){
        console.log("Error->", e);
        res.status(500).json({message : e})
    }
}

exports.updateUser = async(req, res) => {
    await updateUser('users', req.param.id, req.body)
    res.status(200).json({message: 'Usuario editado correctamente'});
}

exports.findByQuery =  async (req, res) => {
    const id = req.params.id;
    const data = await findByQuery('users', 'sucursal', '==', id);
    const result = data.docs.map((d) => {
        return {id : d.id, ...d.data()}
    })
    res.status(200).json(result)
}

exports.testDecrypt = async (req, res) => {
    const text = req.params.text;
    const encrypted = Crypt(text);

    res.status(200).json({result : encrypted});
}