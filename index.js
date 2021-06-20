const express =require('express');
const routes = require('./routes');
// Creando la app de express
const app = express();

// Cargo rutas
app.use('/', routes()  );

// Va a correr en este puerto
app.listen(3000);
