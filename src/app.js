const express = require('express');
const cors = require("cors");
const app = express();
app.use(express.urlencoded({extended : false}))
app.use(cors({
    origin:'*'
}));
app.use(express.json())
app.use(require('./routes/users'))
app.use(require('./routes/auth'))
app.use(require('./routes/register'))

module.exports = app;
