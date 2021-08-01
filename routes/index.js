const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Importo el controlador
const proyectoController = require('../controllers/proyectoController');

//rutas para caja chica
const aperturasController = require('../controllers/caja/aperturasController');
const cajachicasController = require('../controllers/caja/cajachicasController');
const cierresController = require('../controllers/caja/cierresController');
const cuentabancariaController = require('../controllers/caja/cuentabancariaController');
const ingresocajasController = require('../controllers/caja/ingresocajasController');
const retirocajasController = require('../controllers/caja/retirocajasController');

//rutas para clientes
const clientesController = require('../controllers/clientes/clientesController');
const tipoclientesController = require('../controllers/clientes/tipoclientesController');

//rutas para compras
const comprasController = require('../controllers/compras/comprasController');
const detallecomprasController = require('../controllers/compras/detallecomprasController');

//rutas para creditos
const creditoComprasController = require('../controllers/creditos/creditocomprasController');
const creditoVentasController = require('../controllers/creditos/creditoventasController');

//rutas para empleados
const rolesasignadosController = require('../controllers/empleados/rolesasignadosController');
const rolesController = require('../controllers/empleados/rolesController');
const usuariosController = require('../controllers/empleados/usuariosController');

//rutas para inventario
const insumosController = require('../controllers/inventario/insumosController');
const materiadecoracionesController = require('../controllers/inventario/materiadecoracionesController');
const materiapastelesController = require('../controllers/inventario/materiapastelesController');
const variedadesController = require('../controllers/inventario/variedadesController');

//rutas para maquinaria
const maquinariaController = require('../controllers/maquinaria/maquinariaController');

//rutas para proveedores
const divisasController = require('../controllers/proveedores/divisasController');
const marcasController = require('../controllers/proveedores/marcasController');
const proveedoresController = require('../controllers/proveedores/proveedoresController');

//rutas para recetas
const recetasController = require('../controllers/recetas/recetasController');
const recetasventasController = require('../controllers/recetas/recetasventasController');
const tiporecetasController = require('../controllers/recetas/tiporecetasController');

//rutas para ventas
const detalleventasController = require('../controllers/ventas/detalleventasController');
const ventasController = require('../controllers/ventas/ventasController');

//auth
const authController = require('../controllers/authController');

module.exports = function () {
    // ruta para el home
    router.get('/', proyectoController.proyectoHome);

    //AQUI VAMOS A TENER UN ORDEN BASTANTE COMPLEJO SINO NOS VAMOS A PERDER
    //LAS RUTAS VAN A ESTAR ORDENADAS SEGUN CARPETAS DE MODELS

    //CAJA
    //aperturas
    router.get('/aperturas', aperturasController.mostrarAperturas);
    router.get('/aperturas_paginar', aperturasController.mostrarAperturasPaginados);
    router.post('/aperturas_crear', aperturasController.crearAperturas);
    router.post('/aperturas_actualizar', aperturasController.actualizarAperturas);
    router.post('/aperturas_eliminar', aperturasController.eliminarAperturas);
    router.post('/aperturas_activar', aperturasController.activarAperturas);

    //cajachica
    router.get('/cajachica', cajachicasController.mostrarCajaChicas);
    router.get('/cajachica_paginar', cajachicasController.mostrarCajaChicasPaginados);
    router.post('/cajachica_crear', cajachicasController.crearCajaChicas);
    router.post('/cajachica_actualizar', cajachicasController.actualizarCajaChicas);
    router.post('/cajachica_eliminar', cajachicasController.eliminarCajaChicas);
    router.post('/cajachica_activar', cajachicasController.activarCajaChicas);

    //cierres
    router.get('/cierres', cierresController.mostrarCierres);
    router.get('/cierres_paginar', cierresController.mostrarCierresPaginados);
    router.post('/cierres_crear', cierresController.crearCierres);
    router.post('/cierres_actualizar', cierresController.actualizarCierres);
    router.post('/cierres_eliminar', cierresController.eliminarCierres);
    router.post('/cierres_activar', cierresController.activarCierres);

    //cuenta bancaria
    router.get('/cuentabancaria', cuentabancariaController.mostrarCuentaBancaria);
    router.get('/cuentabancaria_paginar', cuentabancariaController.mostrarCuentaBancariaPaginados);
    router.post('/cuentabancaria_crear', cuentabancariaController.crearCuentaBancaria);
    router.post('/cuentabancaria_actualizar', cuentabancariaController.actualizarCuentaBancaria);
    router.post('/cuentabancaria_eliminar', cuentabancariaController.eliminarCuentaBancaria);
    router.post('/cuentabancaria_activar', cuentabancariaController.activarCuentaBancaria);

    //ingresos
    router.get('/ingresos', ingresocajasController.mostrarIngresoCajas);
    router.get('/ingresos_paginar', ingresocajasController.mostrarIngresoCajasPaginados);
    router.post('/ingresos_crear', ingresocajasController.crearIngresoCajas);
    router.post('/ingresos_actualizar', ingresocajasController.actualizarIngresoCajas);
    router.post('/ingresos_eliminar', ingresocajasController.eliminarIngresoCajas);
    router.post('/ingresos_activar', ingresocajasController.activarIngresoCajas);

    //retiros
    router.get('/retiros', retirocajasController.mostrarRetiroCajas);
    router.get('/retiros_paginar', retirocajasController.mostrarRetiroCajasPaginados);
    router.post('/retiros_crear', retirocajasController.crearRetiroCajas);
    router.post('/retiros_actualizar', retirocajasController.actualizarRetiroCajas);
    router.post('/retiros_eliminar', retirocajasController.eliminarRetiroCajas);
    router.post('/retiros_activar', retirocajasController.activarRetiroCajas);

    //CLIENTES
    //clientes
    router.get('/clientes', clientesController.mostrarClientes);
    router.get('/clientes_paginar', clientesController.mostrarClientesPaginados);
    router.post('/clientes_crear', clientesController.crearClientes);
    router.post('/clientes_actualizar', clientesController.actualizarClientes);
    router.post('/clientes_eliminar', clientesController.eliminarClientes);
    router.post('/clientes_activar', clientesController.activarClientes);


    //tipo clientes
    router.get('/tipoclientes', tipoclientesController.mostrarTipoClientes);
    router.get('/tipoclientes_paginar', tipoclientesController.mostrarTipoClientesPaginados);
    router.post('/tipoclientes_crear', tipoclientesController.crearTipoClientes);
    router.post('/tipoclientes_actualizar', tipoclientesController.actualizarTipoClientes);
    router.post('/tipoclientes_eliminar', tipoclientesController.eliminarTipoClientes);
    router.post('/tipoclientes_activar', tipoclientesController.activarTipoClientes);

    //COMPRAS
    //compras
    router.get('/compras', comprasController.mostrarCompras);
    router.get('/compras_paginar', comprasController.mostrarComprasPaginados);
    router.post('/compras_crear', comprasController.crearCompras);
    router.post('/compras_actualizar', comprasController.actualizarCompras);
    router.post('/compras_eliminar', comprasController.eliminarCompras);
    router.post('/compras_activar', comprasController.activarCompras);

    //detalle de compras
    router.get('/detallecompras', detallecomprasController.mostrarDetalleCompras);
    router.get('/detallecompras_paginar', detallecomprasController.mostrarDetalleComprasPaginados);
    router.post('/detallecompras_crear', detallecomprasController.crearDetalleCompras);
    router.post('/detallecompras_actualizar', detallecomprasController.actualizarDetalleCompras);
    router.post('/detallecompras_eliminar', detallecomprasController.eliminarDetalleCompras);
    router.post('/detallecompras_activar', detallecomprasController.activarDetalleCompras);

    //CREDITOS
    //creditos compras
    router.get('/creditocompras', creditoComprasController.mostrarCreditoCompras);
    router.get('/creditocompras_paginar', creditoComprasController.mostrarCreditoComprasPaginados);
    router.post('/creditocompras_crear', creditoComprasController.crearCreditoCompras);
    router.post('/creditocompras_actualizar', creditoComprasController.actualizarCreditoCompras);
    router.post('/creditocompras_eliminar', creditoComprasController.eliminarCreditoCompras);
    router.post('/creditocompras_activar', creditoComprasController.activarCreditoCompras);

    //creditos ventas
    router.get('/creditoventas', creditoVentasController.mostrarCreditoVentas);
    router.get('/creditoventas_paginar', creditoVentasController.mostrarCreditoVentasPaginados);
    router.post('/creditoventas_crear', creditoVentasController.crearCreditoVentas);
    router.post('/creditoventas_actualizar', creditoVentasController.actualizarCreditoVentas);
    router.post('/creditoventas_eliminar', creditoVentasController.eliminarCreditoVentas);
    router.post('/creditoventas_activar', creditoVentasController.activarCreditoVentas);

    //EMPLEADOS
    //roles asignados
    router.get('/rolesasignados', rolesasignadosController.mostrarRolesAsignados);
    router.get('/rolesasignados_paginar', rolesasignadosController.mostrarRolesAsignadosPaginados);
    router.post('/rolesasignados_crear', rolesasignadosController.crearRolesAsignados);
    router.post('/rolesasignados_actualizar', rolesasignadosController.actualizarRolesAsignados);
    router.post('/rolesasignados_eliminar', rolesasignadosController.eliminarRolesAsignados);
    router.post('/rolesasignados_activar', rolesasignadosController.activarRolesAsignados);

    //roles
    router.get('/roles', rolesController.mostrarRoles);
    router.get('/roles_paginar', rolesController.mostrarRolesPaginados);
    router.post('/roles_crear', rolesController.crearRoles);
    router.post('/roles_actualizar', rolesController.actualizarRoles);
    router.post('/roles_eliminar', rolesController.eliminarRoles);
    router.post('/roles_activar', rolesController.activarRoles);

    //usuarios
    router.get('/usuarios', usuariosController.mostrarUsuarios);
    router.get('/usuarios_paginar', usuariosController.mostrarUsuariosPaginados);
    router.post('/usuarios_crear', usuariosController.crearUsuarios);
    router.post('/usuarios_actualizar', usuariosController.actualizarUsuarios);
    router.post('/usuarios_eliminar', usuariosController.eliminarUsuarios);
    router.post('/usuarios_activar', usuariosController.activarUsuarios);

    //INVENTARIO
    //insumos
    router.get('/insumos', insumosController.mostrarInsumos);
    router.get('/insumos_paginar', insumosController.mostrarInsumosPaginados);
    router.post('/insumos_crear', insumosController.crearInsumos);
    router.post('/insumos_actualizar', insumosController.actualizarInsumos);
    router.post('/insumos_eliminar', insumosController.eliminarInsumos);
    router.post('/insumos_activar', insumosController.activarInsumos);

    //materiadecoraciones
    router.get('/materiadecoraciones', materiadecoracionesController.mostrarMateriaDecoraciones);
    router.get('/materiadecoraciones_paginar', materiadecoracionesController.mostrarMateriaDecoracionesPaginados);
    router.post('/materiadecoraciones_crear', materiadecoracionesController.crearMateriaDecoraciones);
    router.post('/materiadecoraciones_actualizar', materiadecoracionesController.actualizarMateriaDecoraciones);
    router.post('/materiadecoraciones_eliminar', materiadecoracionesController.eliminarMateriaDecoraciones);
    router.post('/materiadecoraciones_activar', materiadecoracionesController.activarMateriaDecoraciones);

    //materiapasteles
    router.get('/materiapasteles', materiapastelesController.mostrarMateriaPasteles);
    router.get('/materiapasteles_paginar', materiapastelesController.mostrarMateriaPastelesPaginados);
    router.post('/materiapasteles_crear', materiapastelesController.crearMateriaPasteles);
    router.post('/materiapasteles_actualizar', materiapastelesController.actualizarMateriaPasteles);
    router.post('/materiapasteles_eliminar', materiapastelesController.eliminarMateriaPasteles);
    router.post('/materiapasteles_activar', materiapastelesController.activarMateriaPasteles);

    //variedades
    router.get('/variedades', variedadesController.mostrarVariedades);
    router.get('/variedades_paginar', variedadesController.mostrarVariedadesPaginados);
    router.post('/variedades_crear', variedadesController.crearVariedades);
    router.post('/variedades_actualizar', variedadesController.actualizarVariedades);
    router.post('/variedades_eliminar', variedadesController.eliminarVariedades);
    router.post('/variedades_activar', variedadesController.activarVariedades);

    //MAQUINARIA
    //maquinaria
    router.get('/maquinaria', maquinariaController.mostrarMaquinaria);
    router.get('/maquinaria_paginar', maquinariaController.mostrarMaquinariaPaginados);
    router.post('/maquinaria_crear', maquinariaController.crearMaquinaria);
    router.post('/maquinaria_actualizar', maquinariaController.actualizarMaquinaria);
    router.post('/maquinaria_eliminar', maquinariaController.eliminarMaquinaria);
    router.post('/maquinaria_activar', maquinariaController.activarMaquinaria);

    //PROVEEDORES
    //divisas
    router.get('/divisas', divisasController.mostrarDivisas);
    router.get('/divisas_paginar', divisasController.mostrarDivisasPaginados);
    router.post('/divisas_crear', divisasController.crearDivisas);
    router.post('/divisas_actualizar', divisasController.actualizarDivisas);
    router.post('/divisas_eliminar', divisasController.eliminarDivisas);
    router.post('/divisas_activar', divisasController.activarDivisas);

    //marcas
    router.get('/marcas', marcasController.mostrarMarcas);
    router.get('/marcas_paginar', marcasController.mostrarMarcasPaginados);
    router.post('/marcas_crear', marcasController.crearMarcas);
    router.post('/marcas_actualizar', marcasController.actualizarMarcas);
    router.post('/marcas_eliminar', marcasController.eliminarMarcas);
    router.post('/marcas_activar', marcasController.activarMarcas);

    //proveedores
    router.get('/proveedores', proveedoresController.mostrarProveedores);
    router.get('/proveedores_paginar', proveedoresController.mostrarProveedoresPaginados);
    router.post('/proveedores_crear', proveedoresController.crearProveedores);
    router.post('/proveedores_actualizar', proveedoresController.actualizarProveedores);
    router.post('/proveedores_eliminar', proveedoresController.eliminarProveedores);
    router.post('/proveedores_activar', proveedoresController.activarProveedores);
    //RECETAS
    //recetas
    router.get('/recetas', recetasController.mostrarRecetas);
    router.get('/recetas_paginar', recetasController.mostrarRecetasPaginados);
    router.post('/recetas_crear', recetasController.crearRecetas);
    router.post('/recetas_actualizar', recetasController.actualizarRecetas);
    router.post('/recetas_eliminar', recetasController.eliminarRecetas);
    router.post('/recetas_activar', recetasController.activarRecetas);

    //recetas ventas
    router.get('/recetasventas', recetasventasController.mostrarRecetasVentas);
    router.get('/recetasventas_paginar', recetasventasController.mostrarRecetasVentasPaginados);
    router.post('/recetasventas_crear', recetasventasController.crearRecetasVentas);
    router.post('/recetasventas_actualizar', recetasventasController.actualizarRecetasVentas);
    router.post('/recetasventas_eliminar', recetasventasController.eliminarRecetasVentas);
    router.post('/recetasventas_activar', recetasventasController.activarRecetasVentas);

    //tipo recetas
    router.get('/tiporecetas', tiporecetasController.mostrarTipoRecetas);
    router.get('/tiporecetas_paginar', tiporecetasController.mostrarTipoRecetasPaginados);
    router.post('/tiporecetas_crear', tiporecetasController.crearTipoRecetas);
    router.post('/tiporecetas_actualizar', tiporecetasController.actualizarTipoRecetas);
    router.post('/tiporecetas_eliminar', tiporecetasController.eliminarTipoRecetas);
    router.post('/tiporecetas_activar', tiporecetasController.activarTipoRecetas);

    //VENTAS
    //ventas
    router.get('/ventas', ventasController.mostrarVentas);
    router.get('/ventas_paginar', ventasController.mostrarVentasPaginados);
    router.post('/ventas_crear', ventasController.crearVentas);
    router.post('/ventas_actualizar', ventasController.actualizarVentas);
    router.post('/ventas_eliminar', ventasController.eliminarVentas);
    router.post('/ventas_activar', ventasController.activarVentas);

    //detalle de ventas
    router.get('/detalleventas', detalleventasController.mostrarDetalleVentas);
    router.get('/detalleventas_paginar', detalleventasController.mostrarDetalleVentasPaginados);
    router.post('/detalleventas_crear', detalleventasController.crearDetalleVentas);
    router.post('/detalleventas_actualizar', detalleventasController.actualizarDetalleVentas);
    router.post('/detalleventas_eliminar', detalleventasController.eliminarDetalleVentas);
    router.post('/detalleventas_activar', detalleventasController.activarDetalleVentas);


    //RUTAS DE AUTENTICACION DE USUARIOS Y CONSUMO DE API

    //autenticacion
    router.post('/login', authController.autenticarUsuario);
    router.get('/auth', auth, authController.usuarioAutenticado);

    return router;
}