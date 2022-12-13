const {getAuth} = require("firebase-admin/auth");
const {db} = require("../firebase");

exports.deleteAuth = async(user) => {
    return await getAuth().deleteUser(user.uid);
}