const express = require('express');
const cors = require("cors");

const app = express();
app.use(express.urlencoded({extended : false}))
app.use(cors({
    origin:'*'
}));
app.use(express.json())
app.use(require('./routes/users'));
app.use(require('./routes/auth'));
app.use(require('./routes/register'));
app.use(require('./routes/email'));
app.use(require('./routes/store'));
app.use(require('./routes/file'));
app.use(require('./routes/role'));

module.exports = app;
