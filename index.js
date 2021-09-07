const express = require('express');
const cors = require('cors');
require('./config/db');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env' });
const routes = require('./routes/index');
// Creando la app de express
const app = express();

//validacion de rutas
app.use(cors());

// habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Cargo rutas
app.use('/', routes());

// Va a correr en este puerto
//app.listen(process.env.PUERTO);

//este codigo debe ir descomentado a la hora de subir a heroku
const host = '0.0.0.0';
const port = process.env.PORT;

app.listen(port, host, () => {
    console.log('todo esta funcionando')
});
