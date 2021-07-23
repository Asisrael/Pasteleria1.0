const Divisas = require('../../models/proveedores/Divisas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarDivisas = async (req, res) => {
    const divisas = await Divisas.find();

    if (divisas.length === 0) {
        return res.send('No se encontraron divisas');
    }
    else {
        res.send(divisas);
    }
}

exports.mostrarDivisasPaginados = async (req, res) => {
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
    Divisas.count().then(function (count) {
        totalItems = count;
        mod = (totalItems % perPage);
        if (mod === 0) {
            totalPages = (totalItems / perPage);
        }
        else {
            totalPages = parseInt(((totalItems / perPage) + 1));
        }
    })
    const divisas = await Divisas.find().skip(showed).limit(perPage).lean().sort({ [filter]: order });
    if (divisas.length === 1) {
        return res.send('No se encontraron divisas');
    }
    else {
        let pagination = {
            data: divisas,
            actualPage: actualPage,
            totalPages: totalPages
        }
        res.send(pagination);
    }
}

exports.crearDivisas = async (req, res) => {
    const divisas = new Divisas({
        nombre: req.body.nombre,
    });

    divisas.save(function (err, divisas) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(divisas);
    });
}

exports.actualizarDivisas = async (req, res) => {
    const body = req.body;
    Divisas.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudieron actualizar las divisas',
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

exports.eliminarDivisas = async (req, res) => {
    const body = req.body;
    Divisas.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudieron eliminar las divisas',
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
exports.activarDivisas = async (req, res) => {
    const body = req.body;
    Divisas.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudieron activar las divisas',
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