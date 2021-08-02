const Proveedores = require('../../models/proveedores/Proveedores');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarProveedores = async (req, res) => {
    const proveedores = await Proveedores.find();

    if (proveedores.length === 0) {
        return res.send('No se encontraro el proveedor');
    }
    else {
        res.send(proveedores);
    }
}
exports.mostrarProveedoresPaginados = async (req, res) => {
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
    Proveedores.count().then(function (count) {
        totalItems = count;
        mod = (totalItems % perPage);
        if (mod === 0) {
            totalPages = (totalItems / perPage);
        }
        else {
            totalPages = parseInt(((totalItems / perPage) + 1));
        }
    })
    const proveedores = await Proveedores.find().skip(showed).limit(perPage).lean().sort({ nombre: order });
    if (proveedores.length === 0) {
        return res.send('No se encontraron proveedores');
    }
    else {
        let pagination = {
            data: proveedores,
            actualPage: actualPage,
            totalPages: totalPages
        }
        res.send(pagination);
    }
}

exports.crearProveedores = async (req, res) => {
    const proveedores = new Proveedores({
        nombre: req.body.nombre,
    });

    proveedores.save(function (err, proveedores) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(proveedores);
    });

}

exports.actualizarProveedores = async (req, res) => {
    const body = req.body;
    Proveedores.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo actualizar el proveedor',
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

exports.eliminarProveedores = async (req, res) => {
    const body = req.body;
    proveedores.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo eliminar el proveedor',
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
exports.activarProveedores = async (req, res) => {
    const body = req.body;
    Preveedores.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo activar el proveedor',
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