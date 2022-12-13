const {db, storage, getDownloadURL, ref } = require('../firebase')
const {getAuth} = require("firebase-admin/auth");
const bcrypt = require("bcrypt");
const {resolveContent} = require("nodemailer/lib/shared");
const {reject} = require("bcrypt/promises");
class User {
    static getAll = async (collection) => {
        return await db.collection(collection).get();
    }
    static getOne = async (collection, id) => {
        return await db.collection(collection).doc(id).get();
    }
    static saveUser = async (username, name, apellidouno, apellidodos, role, sucursal, correo, password) => {
        await getAuth().createUser({
            email : correo,
            password : password,
            disabled : false,
            emailVerified : true,
            displayName : name
        }).then(async (userRecord) => {
            const hash = await bcrypt.hash(password, 10);
            await db.collection('users').add({
                uid : userRecord.uid,
                username,
                name,
                apellidouno,
                apellidodos,
                password:hash,
                role,
                correo,
                sucursal
            });
        });
    }
    static deleteUser = async (collection, id) => {
        return await db.collection(collection).doc(id).delete();
    }
    static updateUser = async (collection, id, body) => {
        return await db.collection(collection).doc(id).update(body);
    }

    static findByQuery = async (collection, key, compare, value) => {
        return await db.collection(collection).where(key, compare, value).get();
    }

}

module.exports = User

