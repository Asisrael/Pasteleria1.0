const RetiroCajas = require('../../models/caja/RetiroCajas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarRetiroCajas = async (req, res) => {
    const retiros = await RetiroCajas.find();

    if (retiros.length === 0) {
        return res.send('No se encontraron retiros');
    }
    else {
        res.send(retiros);
    }
}

exports.mostrarRetiroCajasPaginados = async (req, res) => {

}

exports.crearRetiroCajas = async (req, res) => {
    const retiros = new RetiroCajas({
        caja_chica: req.body.caja_chica,
        responsable: req.body.responsable,
    });

    retiros.save(function (err, retiros) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(retiros);
    });
}

exports.actualizarRetiroCajas = async (req, res) => {
    const body = req.body;
    RetiroCajas.updateOne({ _id: body._id }, {
        $set: {
            caja_chica: body.caja_chica,
            responsable: body.responsable,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar el retiro',
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

exports.eliminarRetiroCajas = async (req, res) => {
    const body = req.body;
    RetiroCajas.updateOne({ _id: body._id }, {
        $set: {
            caja_chica: body.caja_chica,
            responsable: body.responsable,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar el retiro',
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
exports.activarRetiroCajas = async (req, res) => {
    const body = req.body;
    RetiroCajas.updateOne({ _id: body._id }, {
        $set: {
            caja_chica: body.caja_chica,
            responsable: body.responsable,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar el retiro',
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