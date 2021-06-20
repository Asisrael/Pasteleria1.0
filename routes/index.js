const express =require('express');
const router =express.Router();

// Importo el controlador
const proyectoController = require('../controllers/proyectoController');

module.exports = function(){ 
    // ruta para el home
    router.get('/',proyectoController.proyectoHome);
    return router;
}



