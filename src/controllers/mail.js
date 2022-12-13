const {MAIL_TRANSPORTER, MAIL_AUTH, MAIL_PASSWORD} = require("../utils/mailConsts");
exports.sendMail = async (req, password) => {
    await MAIL_TRANSPORTER.sendMail({
        from: `ECOTICKET <${MAIL_AUTH.sender}>`,
        to: req.body.correo,
        subject: 'CREDENCIALES ECOTICKET',
        html: MAIL_PASSWORD(req.body.username, password)
    })
}