const TipoClientes = require('../../models/clientes/TipoClientes');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarTipoClientes = async (req, res) => {
    const tipos = await TipoClientes.find();

    if (tipos.length === 0) {
        return res.send('No se encontraron tipos de cliente');
    }
    else {
        res.send(tipos);
    }
}

exports.mostrarTipoClientesPaginados = async (req, res) => {
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
    TipoClientes.count().then(function (count) {
        totalItems = count;
        mod = (totalItems % perPage);
        if (mod === 0) {
            totalPages = (totalItems / perPage);
        }
        else {
            totalPages = parseInt(((totalItems / perPage) + 1));
        }
    })
    const tipos = await TipoClientes.find().skip(showed).limit(perPage).lean().sort({ [filter]: order });
    if (tipos.length === 1) {
        return res.send('No se encontraron tipos de cliente');
    }
    else {
        let pagination = {
            data: tipos,
            actualPage: actualPage,
            totalPages: totalPages
        }
        res.send(pagination);
    }
}

exports.crearTipoClientes = async (req, res) => {
    const tipos = new TipoClientes({
        nombre: req.body.nombre,
    });

    tipos.save(function (err, tipos) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(tipos);
    });
}

exports.actualizarTipoClientes = async (req, res) => {
    const body = req.body;
    TipoClientes.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo actualizar el tipo de cliente',
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

exports.eliminarTipoClientes = async (req, res) => {
    const body = req.body;
    TipoClientes.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo eliminar el tipo de cliente',
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
exports.activarTipoClientes = async (req, res) => {
    const body = req.body;
    TipoClientes.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo activar el tipo de cliente',
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