const Ventas = require('../../models/ventas/Ventas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarVentas = async (req, res) => {
    const ventas = await Ventas.find();

    if (ventas.length === 0) {
        return res.send('No se encontraron ventas');
    }
    else {
        res.send(ventas);
    }
}

exports.mostrarVentasPaginados = async (req, res) => {
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
    result= await Ventas.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron ventas');
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

exports.crearVentas = async (req, res) => {
    const ventas = new Ventas({
        fecha_venta: req.body.fecha_venta,
        total: req.body.total,
        iva_venta: req.body.iva_venta,
        descuento: req.body.descuento,
        cliente: req.body.cliente,
        responsable: req.body.responsable,
    });

    ventas.save(function (err, ventas) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(ventas);
    });
}

exports.actualizarVentas = async (req, res) => {
    const body = req.body;
    Ventas.updateOne({ _id: body._id }, {
        $set: {
            fecha_venta: body.fecha_venta,
            total: body.total,
            iva_venta: body.iva_venta,
            descuento: body.descuento,
            cliente: body.cliente,
            responsable: body.responsable,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar la venta',
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

exports.eliminarVentas = async (req, res) => {
    const body = req.body;
    Ventas.updateOne({ _id: body._id }, {
        $set: {
            fecha_venta: body.fecha_venta,
            total: body.total,
            iva_venta: body.iva_venta,
            descuento: body.descuento,
            cliente: body.cliente,
            responsable: body.responsable,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar la venta',
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

exports.activarVentas = async (req, res) => {
    const body = req.body;
    Ventas.updateOne({ _id: body._id }, {
        $set: {
            fecha_venta: body.fecha_venta,
            total: body.total,
            iva_venta: body.iva_venta,
            descuento: body.descuento,
            cliente: body.cliente,
            responsable: body.responsable,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar la venta',
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