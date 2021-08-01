const Maquinaria = require('../../models/maquinaria/Maquinarias');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarMaquinaria = async (req, res) => {
    const tipos = await Maquinaria.find();

    if (tipos.length === 0) {
        return res.send('No se encontraro la  maquinaria');
    }
    else {
        res.send(tipos);
    }
}

exports.mostrarMaquinariaPaginados = async (req, res) => {

}

exports.crearMaquinaria = async (req, res) => {
    const tipos = new Maquinaria({
        nombre: req.body.nombre,
        frecuencia: req.body.frecuencia,
    });

    tipos.save(function (err, tipos) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(tipos);
    });

}

exports.actualizarMaquinaria = async (req, res) => {
    const body = req.body;
    Maquinaria.updateOne({ _id: body._id }, {
        $set: {
            nombre: body.nombre,
            frecuencia: body.frecuencia,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar la maquinaria',
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

exports.eliminarMaquinaria = async (req, res) => {
    const body = req.body;
    Maquinaria.updateOne({ _id: body._id }, {
        $set: {
            nombre: body.nombre,
            frecuencia: body.frecuencia,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar la maquinaria',
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
exports.activarMaquinaria = async (req, res) => {
    const body = req.body;
    Maquinaria.updateOne({ _id: body._id }, {
        $set: {
            nombre: body.nombre,
            frecuencia: body.frecuencia,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar la maquinaria',
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