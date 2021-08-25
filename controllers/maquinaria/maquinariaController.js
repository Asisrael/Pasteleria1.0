const Maquinaria = require('../../models/maquinaria/Maquinarias');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarMaquinaria = async (req, res) => {
    const maquinaria = await Maquinaria.find();

    if (maquinaria.length === 0) {
        return res.send('No se encontro la  maquinaria');
    }
    else {
        res.send(maquinaria);
    }
}

exports.mostrarMaquinariaPaginados = async (req, res) => {
    let actualPage = parseInt(req.body.page);
    let perPage = parseInt(req.body.perPage);
    let showed = ((actualPage - 1) * perPage);
    let filter = req.body.filter;
    let order = req.body.order;
    if (order === 'asc') {
        order = -1;
    }
    else if (order === 'desc') {
        order = 1
    }
    let totalPages;
    let totalItems;
    let mod;
    Maquinaria.count().then(function (count) {
        totalItems = count;
        mod = (totalItems % perPage);
        if (mod === 0) {
            totalPages = (totalItems / perPage);
        }
        else {
            totalPages = parseInt(((totalItems / perPage) + 1));
        }
    })
    const maquinaria = await Maquinaria.find().skip(showed).limit(perPage).lean().sort({ nombre: order });
    if (maquinaria.length === 0) {
        return res.send('No se encontro maquinaria');
    }
    else {
        let pagination = {
            data: maquinaria,
            actualPage: actualPage,
            totalPages: totalPages
        }
        res.send(pagination);
    }
}

exports.crearMaquinaria = async (req, res) => {
    const maquinaria = new Maquinaria({
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        frecuencia: req.body.frecuencia,
    });

    maquinaria.save(function (err, maquinaria) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(maquinaria);
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