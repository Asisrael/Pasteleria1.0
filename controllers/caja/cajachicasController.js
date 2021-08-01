const CajaChicas = require('../../models/caja/CajaChicas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')


exports.mostrarCajaChicas = async (req, res) => {
    const caja_chica = await CajaChicas.find();

    if (caja_chica.length === 0) {
        return res.send('No se encontraron cajas chicas');
    }
    else {
        res.send(caja_chica);
    }

}

exports.mostrarCajaChicasPaginados = async (req, res) => {

}

exports.crearCajaChicas = async (req, res) => {
    const caja_chica = new CajaChicas({
        cantidad: req.body.cantidad,
        caja_chica: req.body.caja_chica,
        responsable: req.body.responsable,
    });

    caja_chica.save(function (err, caja_chica) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp (caja_chica);
    });

}

exports.actualizarCajaChicas = async (req, res) => {
    const body = req.body;
    CajaChicas.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo actualizar la caja chica',
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

exports.eliminarCajaChicas = async (req, res) => {
    const body = req.body;
    CajaChicas.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo eliminar la apertura',
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
exports.activarCajaChicas = async (req, res) => {
    const body = req.body;
    CajaChicas.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo activar la caja chica',
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