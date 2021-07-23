const Proveedores = require('../../models/proveedores/Proveedores');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarProveedores = async (req, res) => {
    const tipos = await Proveedores.find();

    if (tipos.length === 0) {
        return res.send('No se encontraro el proveedor');
    }
    else {
        res.send(tipos);
    }
}
exports.mostrarProveedoresPaginados = async (req, res) => {

}

exports.crearProveedores = async (req, res) => {
    const tipos = new Proveedores({
        nombre: req.body.nombre,
    });

    tipos.save(function (err, tipos) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(tipos);
    });

}

exports.actualizarProveedores = async (req, res) => {
    const body = req.body;
    Proveedores.updateOne({ _id: body._id }, {
        $set: {
            nombre: body.nombre,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar el proveedor',
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

exports.eliminarProveedores = async (req, res) => {
    const body = req.body;
    proveedores.updateOne({ _id: body._id }, {
        $set: {
            nombre: body.nombre,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar el proveedor',
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