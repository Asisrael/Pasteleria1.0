const Clientes = require('../../models/clientes/Clientes');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarClientes = async (req, res) => {
    const clientes = await Clientes.find();

    if (clientes.length === 0) {
        return res.send('No se encontraron clientes');
    }
    else {
        res.send(clientes);
    }
}

exports.mostrarClientesPaginados = async (req, res) => {
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
    Clientes.count().then(function (count) {
        totalItems = count;
        mod = (totalItems % perPage);
        if (mod === 0) {
            totalPages = (totalItems / perPage);
        }
        else {
            totalPages = parseInt(((totalItems / perPage) + 1));
        }
    })
    const clientes = await Clientes.find().skip(showed).limit(perPage).lean().sort({ nombre: order });
    if (clientes.length === 0) {
        return res.send('No se encontraron clientes');
    }
    else {
        let pagination = {
            data: clientes,
            actualPage: actualPage,
            totalPages: totalPages
        }
        res.send(pagination);
    }
}

exports.crearClientes = async (req, res) => {
    const clientes = new Clientes({
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        correo: req.body.correo,
        nit: req.body.nit,
        direccion: req.body.direccion,
        codigo: req.body.codigo,
        tipo_cliente: req.body.tipo_cliente,
    });

    clientes.save(function (err, clientes) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(clientes);
    });
}

exports.actualizarClientes = async (req, res) => {
    const body = req.body;
    Clientes.updateOne({ _id: body._id }, {
        $set: {
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            correo: req.body.correo,
            nit: req.body.nit,
            direccion: req.body.direccion,
            codigo: req.body.codigo,
            tipo_cliente: req.body.tipo_cliente,
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

exports.eliminarClientes = async (req, res) => {
    const body = req.body;
    Clientes.updateOne({ _id: body._id }, {
        $set: {
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            correo: req.body.correo,
            nit: req.body.nit,
            direccion: req.body.direccion,
            codigo: req.body.codigo,
            tipo_cliente: req.body.tipo_cliente,
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
exports.activarClientes = async (req, res) => {
    const body = req.body;
    Clientes.updateOne({ _id: body._id }, {
        $set: {
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            correo: req.body.correo,
            nit: req.body.nit,
            direccion: req.body.direccion,
            codigo: req.body.codigo,
            tipo_cliente: req.body.tipo_cliente,
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