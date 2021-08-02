const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

mongoose.connection.on('error', (error) => {
    console.log(error);
})

//importar los modelos

//caja
require('../models/caja/Aperturas');
require('../models/caja/CajaChicas');
require('../models/caja/Cierres');
require('../models/caja/CuentaBancaria');
require('../models/caja/IngresoCajas');
require('../models/caja/RetiroCajas');

//clientes
require('../models/clientes/Clientes');
require('../models/clientes/TipoClientes');

//compras

//creditos

//empleados

//inventario

//maquinaria
require('../models/maquinaria/Maquinarias');

//proveedores
require('../models/proveedores/Marcas');
require('../models/proveedores/Proveedores');

//recetas

//ventas