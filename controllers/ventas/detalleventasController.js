const DetalleVentas = require('../../models/ventas/DetalleVentas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarDetalleVentas = async (req, res) => {
    const detalles = await DetalleVentas.find();

    if (detalles.length === 0) {
        return res.send('No se encontraron detalles de venta');
    }
    else {
        res.send(detalles);
    }
}

exports.mostrarDetalleVentasPaginados = async (req, res) => {
    let actualPage = parseInt(req.query.page);
    let perPage = parseInt(req.query.per_page);
    let filter = req.query.sort;
    let search = req.query.search;
    let order = req.query.order;
    if(!order){
        filter='registro';
        order='desc';
    }
    order = (order =='desc'|| order == -1)? -1 : 1;
    let columna=req.query.columna;
   
   
    const regex = new RegExp(search, 'i');
    result= await DetalleVentas.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron detalles');
    }
    else {
        let pagination = {
            data: result.docs,
            current_page: result.page,
            last_page: result.totalPages,
            from: 1,
            per_page: result.limit,
            status: true,
            to: result.limit,
            total: result.totalDocs,
        }
        res.send(pagination);
    }
}

exports.crearDetalleVentas = async (req, res) => {
    const detalles = new DetalleVentas({
        cantidad: req.body.cantidad,
        subtotal: req.body.subtotal,
        venta: req.body.venta,
        productos: req.body.productos,
    });

    detalles.save(function (err, detalles) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(detalles);
    });
}

exports.actualizarDetalleVentas = async (req, res) => {
    const body = req.body;
    DetalleVentas.updateOne({ _id: body._id }, {
        $set: {
            cantidad: req.body.cantidad,
            subtotal: body.subtotal,
            venta: body.venta,
            productos: body.productos,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar el detalle de venta',
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

exports.eliminarDetalleVentas = async (req, res) => {
    const body = req.body;
    DetalleVentas.updateOne({ _id: body._id }, {
        $set: {
            cantidad: req.body.cantidad,
            subtotal: body.subtotal,
            venta: body.venta,
            productos: body.productos,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar el detalle de venta',
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

exports.activarDetalleVentas = async (req, res) => {
    const body = req.body;
    DetalleVentas.updateOne({ _id: body._id }, {
        $set: {
            cantidad: req.body.cantidad,
            subtotal: body.subtotal,
            venta: body.venta,
            productos: body.productos,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar el detalle de venta',
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