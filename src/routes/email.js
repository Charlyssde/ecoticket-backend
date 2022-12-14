const {Router} = require('express');
const router = Router();

const {sendEmailPdf, sendinfoPac, sendCredentials, sendPassword} = require("../controllers/mail");

router.post('/email-condiciones', sendEmailPdf);
router.post('/email', sendinfoPac);
router.post('/email-credenciales', sendCredentials);
router.post('/email-password', sendPassword)

module.exports = router;
