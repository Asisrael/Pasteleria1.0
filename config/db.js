const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });

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
require('../models/compras/Compras');
require('../models/compras/DetalleCompras');

//creditos
require('../models/creditos/CreditoCompras');
require('../models/creditos/CreditoVentas');

//empleados
require('../models/empleados/Roles');
require('../models/empleados/RolesAsignados');
require('../models/empleados/Usuarios');

//inventario
require('../models/inventario/Productos');
require('../models/inventario/AjusteInventarios');
require('../models/inventario/TipoProductos');
require('../models/inventario/Tiendas');

//maquinaria
require('../models/maquinaria/Maquinarias');

//proveedores
require('../models/proveedores/Divisas');
require('../models/proveedores/Marcas');
require('../models/proveedores/Proveedores');

//recetas
require('../models/recetas/RecetasVentas');
require('../models/recetas/Recetas');
require('../models/recetas/TipoRecetas');

//ventas
require('../models/ventas/DetalleVentas');
require('../models/ventas/Ventas');