const Cierres = require('../../models/caja/Cierres');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarCierres = async (req, res) => {
    const cierres = await Cierres.find();

    if (cierres.length === 0) {
        return res.send('No se encontraron cierres');
    }
    else {
        res.send(cierres);
    }

}

exports.mostrarCierresPaginados = async (req, res) => {

}

exports.crearCierres = async (req, res) => {
    const cierres = new Cierres({
        total: req.body.total,
        tienda: req.body.tienda,
    });

    cierres.save(function (err, cierres) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(cierres);
    });
}

exports.actualizarCierres = async (req, res) => {
    const body = req.body;
    Cierres.updateOne({ _id: body._id }, {
        $set: {
            cantidad: body.cantidad,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado,
            caja_chica: body.caja_chica,
            responsable: body.responsable,
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar el cierre',
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

exports.eliminarCierres = async (req, res) => {
    const body = req.body;
    Cierres.updateOne({ _id: body._id }, {
        $set: {
            cantidad: body.cantidad,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO',
            caja_chica: body.caja_chica,
            responsable: body.responsable,
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar el cierre',
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
exports.activarCierres = async (req, res) => {

    const body = req.body;
    Cierres.updateOne({ _id: body._id }, {
        $set: {
            cantidad: body.cantidad,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO',
            caja_chica: body.caja_chica,
            responsable: body.responsable,
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar el cierre',
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