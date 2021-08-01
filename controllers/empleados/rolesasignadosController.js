const RolesAsignados = require('../../models/empleados/RolesAsignados');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarRolesAsignados = async (req, res) => {
    const roles_asignados = await RolesAsignados.find();

    if (roles_asignados.length === 0) {
        return res.send('No se encontraron roles asignados');
    }
    else {
        res.send(roles_asignados);
    }
}

exports.mostrarRolesAsignadosPaginados = async (req, res) => {

}

exports.crearRolesAsignados = async (req, res) => {
    const roles_asignados = new RolesAsignados({
        nombre: req.body.nombre,
    });

    roles_asignados.save(function (err, roles_asignados) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(roles_asignados);
    });
}

exports.actualizarRolesAsignados = async (req, res) => {
    const body = req.body;
    RolesAsignados.updateOne({ _id: body._id }, {
        $set: {
            roles: req.body.roles,
            usuarios: req.body.usuarios,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar el rol asignado',
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

exports.eliminarRolesAsignados = async (req, res) => {
    const body = req.body;
    RolesAsignados.updateOne({ _id: body._id }, {
        $set: {
            roles: req.body.roles,
            usuarios: req.body.usuarios,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar el rol asignado',
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
exports.activarRolesAsignados = async (req, res) => {
    const body = req.body;
    RolesAsignados.updateOne({ _id: body._id }, {
        $set: {
            roles: req.body.roles,
            usuarios: req.body.usuarios,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar el rol asignado',
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