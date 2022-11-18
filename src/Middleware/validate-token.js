const jwt = require('jsonwebtoken')
const {getAuth} = require("firebase-admin/auth");

const verifyToken = (req, res, next) => {
    if(!req.headers.authorization) return res.status(401).json({error : 'Acceso denegado'})

    let token = req.headers.authorization.replace('Bearer ', '');

    if (!token) return res.status(401).json({ error: 'Acceso denegado' })

    getAuth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            console.log("Token->", decodedToken)
            next();
        })
        .catch((error) => {
            console.log("Error->", error)
            res.status(401).json({message : 'Acceso denegado'})
        });

}

module.exports = verifyToken;