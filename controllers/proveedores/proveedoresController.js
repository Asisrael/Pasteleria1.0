const Proveedores = require('../../models/proveedores/Proveedores');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarProveedores = async (req, res) => {
    res.send('tipos de cliente')
}

exports.mostrarProveedoresPaginados = async (req, res) => {

}

exports.crearProveedores = async (req, res) => {

}

exports.actualizarProveedores = async (req, res) => {

}

exports.eliminarProveedores = async (req, res) => {
    
}
exports.activarProveedores = async (req, res) => {
    const body = req.body;
    Preveedores.updateOne({ _id: body._id }, {
        $set: {
            nombre: body.nombre,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar el proveedor',
                    err
                });
            }
            else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
}