const {Router} = require('express');
const router = Router();
const nodemailer = require('nodemailer');


router.post('/email-condiciones', async(req, res) => {
    
    const {destinatario } = req.body;

    contentHTML=`
    <div align="justify"> 
    <h1>Términos y Condiciones</h1>

    <h2>Limitación de responsabilidad</h2>

    <p>Por medio de este anuncio, la Empresa Consultoría y Desarrollo de Sistemas para la Innovación Tecnológica S.A. de C.V., 
    a quien en lo sucesivo se le denominará CODESIT, sus subsidiarias, afiliadas y Socios Comerciales, informan a los usuarios 
    de las páginas y Servicios de CODESIT (en adelante los "usuarios"), que a través de éstas pone a su disposición dispositivos 
    técnicos de enlace (tales como, entre otros, links, banners, botones, APIS), directorios y herramientas de búsqueda que les 
    permiten acceder a páginas web pertenecientes a terceros (en adelante los "sitios enlazados"). La instalación de estos enlaces
    en las páginas de CODESIT, sus subsidiarias, afiliadas y Socios Comerciales, se limita a facilitar a los usuarios la búsqueda 
    y acceso a la información disponible de los sitios enlazados en internet, y no presupone que exista ninguna clase de vínculo o 
    asociación entre CODESIT, sus subsidiarias, afiliadas y Socios Comerciales con los operadores de los sitios enlazados.</p>

    <p>CODESIT, sus subsidiarias, afiliadas y Socios Comerciales no controlan, aprueban ni hacen propios los servicios, información, 
    datos, archivos, productos y cualquier clase de material existente en los sitios enlazados. El usuario, por lo tanto, debe extremar la 
    prudencia en la valoración y utilización de los servicios, información, datos, archivos, productos y cualquier clase de material existente 
    en los sitios enlazados.</p>
    
    <p>CODESIT, sus subsidiarias, afiliadas y Socios Comerciales, no garantizan ni asumen responsabilidad alguna por los daños y perjuicios de 
    toda clase que puedan causarse por:</p>

    <ul>
        <li>El funcionamiento, disponibilidad, accesibilidad o continuidad de los sitios enlazados;</li>
        <li>El mantenimiento de los servicios, información, datos, archivos, productos y cualquier clase de material existente en los sitios enlazados;</li>
        <li>Las obligaciones y ofertas existentes en los sitios enlazados.</li>
    </ul>

    <h2>Utilidad<h2/>

    <p>Mediante la utilización de esta página, el usuario reconoce y acepta que CODESIT, sus subsidiarias, afiliadas y Socios Comerciales, no garantizan 
    que los sitios enlazados o la información proporcionada por terceros, sean útiles para la realización de ninguna actividad en particular.</p>

    <p>Mediante el uso de esta página, el usuario reconoce y acepta CODESIT, sus subsidiarias, afiliadas y Socios Comerciales quedan excluidas de cualquier 
    responsabilidad por los daños y perjuicios que pudieran haber sido causados por la veracidad de la información o calidad de servicios contenidos u ofrecidos 
    por terceros o que se encuentre en los sitios enlazados o los que surjan con relación a este sitio, por el acceso a esta página como el uso que pueda hacerse 
    de la información contenida en el mismo son exclusiva responsabilidad del usuario. </p>
    
    <P>El contenido de los archivos de la aplicación es el resultado de la información que los Socios Comerciales transfieren a través de los enlaces 
    correspondientes para generar el ticket electrónico y en su caso, los comprobantes fiscales mediante el enlace con las empresas autorizadas para 
    esos fines. El contenido de la información que se genera para los tickets y los comprobantes fiscales digitales no es modificado por la aplicación, 
    solo reproducida de los sistemas de los Socios Comerciales. El archivo del ticket electrónico corresponde al cumplimiento de lo dispuesto en la 
    Miscelánea Fiscal relativo al comprobante que debe entregarse en la venta al público en general, con lo que el usuario de la aplicación acepta 
    recibir ese comprobante mediante el uso de la aplicación.</p>

    <h2>Seguridad</h2>

    <p>Mediante el uso de esta página, el usuario reconoce y acepta que CODESIT, sus subsidiarias, afiliadas y Socios Comerciales, no garantizan la seguridad 
    de los sitios enlazados, y en particular, que los usuarios puedan efectivamente acceder a las distintas páginas web que representan los sitios enlazados, 
    ni que a través de éstos puedan transmitir, difundir, almacenar o poner a disposición de terceros su contenido.</p>

    <p>Mediante el uso de esta página, el usuario reconoce y acepta que CODESIT, sus subsidiarias, afiliadas y Socios Comerciales, quedan excluidas de cualquier 
    responsabilidad por los daños y perjuicios de toda naturaleza que pudieran ser causados por la falta de seguridad de los sitios enlazados.</p>

    <h2>Calidad</h2>

    <p>Mediante el uso de esta página, el usuario reconoce y acepta que CODESIT, sus subsidiarias, afiliadas y Socios Comerciales, no controlan y no garantizan 
    la ausencia de virus en el contenido de los sitios enlazados, ni la ausencia de otros elementos que pudieran producir alteraciones en sus sistemas informáticos 
    o en los documentos electrónicos y archivos almacenados en sus sistemas informáticos.</P>

    <h2>Conexión de redes y datos</h2>

    <p>CODESIT y sus socios comerciales utilizan los servicios de la red de Internet para transferir la información y datos de los tickets electrónicos a los 
    dispositivos móviles de los usuarios de la Aplicación ECOTICKET, por este motivo, es necesario que el usuario de la aplicación cuente con la disponibilidad 
    del uso de datos móviles de internet o se encuentre conectado a una red WiFi para poder recibir los archivos a través de la Aplicación. En caso de no contar 
    con el servicio disponible en su equipo móvil, la información se mantendrá relacionada a su cuenta de usuario para ser recibida en el momento que se encuentre 
    con la conexión al servicio de Internet para ser actualizada en su dispositivo móvil donde tenga iniciada su sesión de usuario de la aplicación ECOTICKET.</p>

    <h2>Propiedad intelectual</h2>

    <p>Mediante el uso de esta página, el usuario reconoce y acepta que CODESIT, sus subsidiarias, afiliadas y Socios Comerciales, quedan excluidas de cualquier 
    responsabilidad que pudiera ser causada por el uso no autorizado de las marcas u otros derechos de propiedad intelectual de terceros o contenidos en los sitios enlazados.
    De igual manera, las eventuales referencias que se hagan en esta página a cualquier producto, servicio, proceso, sitio enlazado, hipertexto o cualquier otra información
    en la que se utilicen marcas, signos distintivos y/o dominios, el nombre comercial o el nombre del fabricante, suministrador, etc., que sean titularidad de terceros, en ningún 
    momento constituirán, ni implicarán respaldo o recomendación alguna por parte de CODESIT, sus subsidiarias, afiliadas y Socios Comerciales y en ningún caso CODESIT, 
    sus subsidiarias, afiliadas y Socios Comerciales se asignan propiedad ni responsabilidad sobre los mismos. La marca ECOTICKET y el logo de la aplicación es una 
    Marca Registrada por CODESIT, cualquier uso de alguno de estos elementos por los socios Comerciales o cualquier tercero sin el consentimiento expreso puede constituir un 
    delito en términos de los dispuesto en las leyes vigentes. 
    </p>

    <h2>Elementos de las páginas</h2>

    <p>Probablemente para proporcionar la información contenida en la página web, como dibujos, diseños, sonido, videos, textos, fotografías o cualquier otra información 
    digital CODESIT, sus subsidiarias, afiliadas y Socios Comerciales, hubieren contratado a terceros para realizar los estudios e investigaciones correspondientes, así como los dibujos, 
    diseños, sonidos, videos, textos, o fotografías, que se muestren en la página. CODESIT, sus subsidiarias, afiliadas y Socios Comerciales advierten que, al no ser de su titularidad, 
    ni desarrollo toda la información contenida en la página web, algunos de los textos, gráficos, vínculos y/o el contenido de algunos artículos incluidos en la misma, podrían no ser veraces 
    o no estar actualizados, por lo que CODESIT, sus subsidiarias, afiliadas y socios comerciales, no se hacen responsables.</p>

    <h2>Ley aplicable y jurisdicción</h2>

    <p>El usuario al hacer uso de las páginas en internet de CODESIT, sus subsidiarias, afiliadas y socios comerciales, acepta de manera expresa, someterse en caso de cualquier controversia, 
    a la jurisdicción de los tribunales de la Ciudad de Xalapa, Veracruz de Ignacio de la Llave, en los Estados Unidos mexicanos, así como las leyes aplicables para el caso concreto vigentes 
    en dicho lugar, renunciando expresamente a cualquier otra jurisdicción que por motivo de su nacionalidad o domicilio pudiera corresponder.</p>
    </div>
    `;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'benitolsca@gmail.com', // generated ethereal user
          pass: 'meomkenvnvenxxmg', // generated ethereal password
        },
      });

    
        const envio = await transporter.sendMail({
        from:"'ECOTICKET' <benitolsca@gmail.com>",
        to:'maheya@gmail.com',
        subject:'AVISO DE PRIVACIDAD, TÉRMINOS Y CONDICIONES',
        attachments:[
           { filename: 'Aviso de privacidad.pdf', path:'./Aviso de privacidad.pdf'},
           { filename: 'Téminos y condiciones.pdf', path:'./Aviso de privacidad.pdf'}
        ]
      })
      console.log("Enviado correctamente ------>", envio.messageId)
      res.status(200).json({
        messege: 'Correo enviado correctamente',
    });
});

router.post('/email', async(req, res) => {
    
    const {name, site, phone, extras} = req.body;

    contentHTML=`
    <h1>Solicitud de incorporación</h1>

    <p>Nombre del Pac: ${name}</p>
    <p>Sitio web del pac: ${site}</p>
    <p>Telefono del pac:${phone}</p>
    <p>Datos de contacto:${extras}</p>

    `;


    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'benitolsca@gmail.com', // generated ethereal user
          pass: 'meomkenvnvenxxmg', // generated ethereal password
        },
      });

    
        const envio = await transporter.sendMail({
        from: "'ECOTICKET' <benitolsca@gmail.com>",
        to:'benitolsca@gmail.com',
        subject: 'Solicitud de Registro PAC',
        html: contentHTML
      })
      console.log("Enviado correctamente ------>", envio.messageId)
      res.status(200).json({
        messege: 'Correo enviado correctamente',
    });
});

router.post('/email-credenciales', async(req, res) => {
    
    const {destinatario, credenciales, asunto} = req.body;

    contentHTML=`
    <h1>${asunto}</h1>

    <p>Datos de contacto:${credenciales}</p>

    `;


    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'benitolsca@gmail.com', // generated ethereal user
          pass: 'meomkenvnvenxxmg', // generated ethereal password
        },
      });

    
        const envio = await transporter.sendMail({
        from:"'ECOTICKET' <benitolsca@gmail.com>",
        to:req.body.destinatario,
        subject:req.body.asunto,
        html: contentHTML
      })
      console.log("Enviado correctamente ------>", envio.messageId)
      res.status(200).json({
        messege: 'Correo enviado correctamente',
    });
});



module.exports = router;
