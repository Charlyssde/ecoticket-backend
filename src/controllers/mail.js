const generateRandomText = require("../utils/generateRandomText");
const {db} = require("../firebase");
const bcrypt = require("bcrypt");
const {MAIL_TRANSPORTER, MAIL_AUTH, MAIL_PASSWORD} = require("../utils/mailConsts");

exports.sendMail = async (req, password) => {
    await MAIL_TRANSPORTER.sendMail({
        from: `ECOTICKET <${MAIL_AUTH.sender}>`,
        to: req.body.correo,
        subject: 'CREDENCIALES ECOTICKET',
        html: MAIL_PASSWORD(req.body.username, password)
    })
}

exports.sendEmailPdf = async (req, res) => {
    const {to} = req.body;
    try {
        const envio = await MAIL_TRANSPORTER.sendMail({
            from: `ECOTICKET <${MAIL_AUTH.sender}>`,
            to: to,
            subject: 'AVISO DE PRIVACIDAD, TÉRMINOS Y CONDICIONES',
            attachments: [
                {filename: 'Aviso de privacidad.pdf', path: './Aviso de privacidad.pdf'},
                {filename: 'Téminos y condiciones.pdf', path: './Téminos y condiciones.pdf'}
            ]
        })
        console.log("Enviado correctamente ------>", envio.messageId)
        res.status(200).json({
            messege: 'Correo enviado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Algo salio mal"})
    }
}

exports.sendinfoPac = async (req, res) => {
    const {name, site, phone, extras} = req.body;
    try {
            contentHTML = `
                    <h1>Solicitud de incorporación</h1>

                    <p>Nombre del Pac: ${name}</p>
                    <p>Sitio web del pac: ${site}</p>
                    <p>Telefono del pac:${phone}</p>
                    <p>Datos de contacto:${extras}</p>

            `;
        const envio = await MAIL_TRANSPORTER.sendMail({
            from: `ECOTICKET <${MAIL_AUTH.sender}>`,
            to: MAIL_AUTH.sender,
            subject: 'Solicitud de Registro PAC',
            html: contentHTML
        })
        console.log("Enviado correctamente sendincorporacion------>", envio.messageId)
        res.status(200).json({
            messege: 'Correo enviado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Algo salio mal"})
    }
}

exports.sendCredentials = async (req, res) => {
    const {to, username, password, subject} = req.body;
    try {
        contentHTML = `
        <h1>Usted ha sido invitado a ingresar al Sistema de Autofacturación ECOTICKET</h1>
        <h2>Las siguientes son sus credenciales de acceso: </h2>
    
        <p>Su nombre de usuario:${username}</p>
        <p>Su contraseña:${password}</p>
    
        `;
    
        const envio = await MAIL_TRANSPORTER.sendMail({
            from: `ECOTICKET <${MAIL_AUTH.sender}>`,
            to: to,
            subject: subject,
            html: contentHTML
        })
        console.log("Enviado correctamente credentials------>", envio.messageId)
        res.status(200).json({
            messege: 'Correo enviado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Algo salio mal"})
    }
}

exports.sendPassword = async(req, res) => {
    const {email} = req.body;
    const user = await db.collection('users').where('email', '==', email).get();
    if(user.docs.length){
        let data = {id : user.docs[0].id , ...user.docs[0].data()};
        let password = generateRandomText();
        const content = `
        <h1> Credenciales de acceso </h1>
        <h2>Ha solicitado recuperar sus credenciales de acceso por parte de Ecoticket</h2>
        
        <p>Nombre de usuario : ${data.username}</p>
        <p>Contraseña : ${password}</p>
    `
    MAIL_TRANSPORTER.sendMail({
            from: `ECOTICKET <${MAIL_AUTH.sender}>`,
            to: email,
            subject: 'Solicitud de restauración de contraseña Ecoticket',
            html : content
        }).then(async (resp) => {
            const hashedPassword = await bcrypt.hash(password, 10)
            await db.collection('users').doc(data.id).update({password: hashedPassword});
            res.status(200).json({message : 'Se ha enviado un correo con las credenciales al correo indicado'})
        }).catch((error) => {
            console.log("Error->", error)
            res.status(500).json({message : 'Ha ocurrido un error al intentar enviar el correo, por favor reintente más tarde.'})
        })
    }else{
        res.status(404).json({message : 'No existe un usuario asociado al correo ingresado, por favor verifique la información'})
    }

}