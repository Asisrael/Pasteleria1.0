const CuentaBancaria = require('../../models/caja/CuentaBancaria');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarCuentaBancaria = async (req, res) => {
    const cuentas = await CuentaBancaria.find();

    if (cuentas.length === 0) {
        return res.send('No se encontraron cuentas');
    }
    else {
        res.send(cuentas);
    }
}

exports.mostrarCuentaBancariaPaginados = async (req, res) => {
   
}

exports.crearCuentaBancaria = async (req, res) => {
    const cuentas = new CuentaBancaria({
        cantidad: req.body.cantidad,
        caja_chica: req.body.caja_chica,
    });

    cuentas.save(function (err, cuentas) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(cuentas);
    });
}

exports.actualizarCuentaBancaria = async (req, res) => {
    const body = req.body;
    CuentaBancaria.updateOne({ _id: body._id }, {
        $set: {
            cantidad: body.cantidad,
            caja_chica: body.caja_chica,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar la cuenta',
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

exports.eliminarCuentaBancaria = async (req, res) => {
    const body = req.body;
    CuentaBancaria.updateOne({ _id: body._id }, {
        $set: {
            cantidad: body.cantidad,
            caja_chica: body.caja_chica,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar la cuenta',
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
exports.activarCuentaBancaria = async (req, res) => {
    const body = req.body;
    CuentaBancaria.updateOne({ _id: body._id }, {
        $set: {
            cantidad: body.cantidad,
            caja_chica: body.caja_chica,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar la cuenta',
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