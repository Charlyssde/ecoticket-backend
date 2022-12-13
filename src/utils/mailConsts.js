const nodemailer = require("nodemailer");
const MAIL_PASSWORD = (username, password) => {
    return  `<h1>Credenciales de acceso ECOTICKET </h1>
        <p>Usuario: ${username}</p>
        <p>contraseña: ${password}</p>`;
}
const MAIL_AUTH = {
    email : string = 'benitolsca@gmail.com',
    sender : string = 'contacto@ecoticketapp.com',
    password : string = 'meomkenvnvenxxmg'
}

const MAIL_TRANSPORTER = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: MAIL_AUTH.email, // generated ethereal user
        pass: MAIL_AUTH.password, // generated ethereal password
    },
});

module.exports = {MAIL_AUTH, MAIL_PASSWORD, MAIL_TRANSPORTER};