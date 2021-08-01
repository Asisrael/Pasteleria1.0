const Roles = require('../../models/empleados/Roles');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarRoles = async (req, res) => {
    const roles = await Roles.find();

    if (roles.length === 0) {
        return res.send('No se encontraron roles');
    }
    else {
        res.send(roles);
    }
}

exports.mostrarRolesPaginados = async (req, res) => {

}

exports.crearRoles = async (req, res) => {
    const roles = new Roles({
        nombre: req.body.nombre,
       
    });

    roles.save(function (err, roles) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(roles);
    });
}

exports.actualizarRoles = async (req, res) => {
    const body = req.body;
   Roles.updateOne({ _id: body._id }, {
        $set: {
            nombre: req.body.nombre,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar el rol',
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

exports.eliminarRoles = async (req, res) => {
    const body = req.body;
    Roles.updateOne({ _id: body._id }, {
        $set: {
            nombre: req.body.nombre,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar el rol',
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
exports.activarRoles = async (req, res) => {
    const body = req.body;
    Roles.updateOne({ _id: body._id }, {
        $set: {
            nombre: req.body.nombre,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar el rol',
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