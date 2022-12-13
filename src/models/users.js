const {db, storage, getDownloadURL, ref} = require('../firebase')
const {getAuth} = require("firebase-admin/auth");
const bcrypt = require("bcrypt");

exports.getAll = async (collection) => {
    return await db.collection(collection).get();
}
exports.getOne = async (collection, id) => {
    return await db.collection(collection).doc(id).get();
}
exports.saveUser = async (username, name, apellidouno, apellidodos, role, sucursal, correo, password) => {
   return await getAuth().createUser({
        email: correo,
        password: password,
        disabled: false,
        emailVerified: true,
        displayName: name
    }).then(async (userRecord) => {
        const hash = await bcrypt.hash(password, 10);
        await db.collection('users').add({
            uid: userRecord.uid,
            username,
            name,
            apellidouno,
            apellidodos,
            password: hash,
            role,
            correo,
            sucursal
        });
    });
}
exports.deleteUser = async (collection, id) => {
    return await db.collection(collection).doc(id).delete();
}
exports.updateUser = async (collection, id, body) => {
    return await db.collection(collection).doc(id).update(body);
}

exports.findByQuery = async (collection, key, compare, value) => {
    return await db.collection(collection).where(key, compare, value).get();
}

