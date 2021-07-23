const Marcas = require('../../models/proveedores/Marcas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarMarcas = async (req, res) => {
    const marcas = await Marcas.find();

    if (marcas.length === 0) {
        return res.send('No se encontraron marcas');
    }
    else {
        res.send(marcas);
    }
}

exports.mostrarMarcasPaginados = async (req, res) => {
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
    Marcas.count().then(function (count) {
        totalItems = count;
        mod = (totalItems % perPage);
        if (mod === 0) {
            totalPages = (totalItems / perPage);
        }
        else {
            totalPages = parseInt(((totalItems / perPage) + 1));
        }
    })
    const marcas = await Marcas.find().skip(showed).limit(perPage).lean().sort({ [filter]: order });
    if (marcas.length === 1) {
        return res.send('No se encontraron marcas');
    }
    else {
        let pagination = {
            data: marcas,
            actualPage: actualPage,
            totalPages: totalPages
        }
        res.send(pagination);
    }
}

exports.crearMarcas = async (req, res) => {
    const marcas = new Marcas({
        nombre: req.body.nombre,
    });

    marcas.save(function (err, marcas) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(marcas);
    });
}

exports.actualizarMarcas = async (req, res) => {
    const body = req.body;
    Marcas.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo actualizar la marca',
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

exports.eliminarMarcas = async (req, res) => {
    const body = req.body;
    Marcas.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo eliminar la marca',
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
exports.activarMarcas = async (req, res) => {
    const body = req.body;
    Marcas.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo activar la marca',
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