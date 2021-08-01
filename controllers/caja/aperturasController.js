const Aperturas = require('../../models/caja/Aperturas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarAperturas = async (req, res) => {
    const aperturas = await Aperturas.find();

    if (aperturas.length === 0) {
        return res.send('No se encontraron aperturas');
    }
    else {
        res.send(aperturas);
    }
}

exports.mostrarAperturasPaginados = async (req, res) => {


}

exports.crearAperturas = async (req, res) => {
    const aperturas = new Aperturas({
        cantidad: req.body.cantidad,
        caja_chica: req.body.caja_chica,
        responsable: req.body.responsable,
    });

    aperturas.save(function (err, aperturas) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(aperturas);
    });

}

exports.actualizarAperturas = async (req, res) => {
    const body = req.body;
    Aperturas.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo actualizar la apertura',
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

exports.eliminarAperturas = async (req, res) => {
    const body = req.body;
    Aperturas.updateOne({ _id: body._id }, {
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
exports.activarAperturas = async (req, res) => {
    const body = req.body;
    Aperturas.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo activar la apertura',
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