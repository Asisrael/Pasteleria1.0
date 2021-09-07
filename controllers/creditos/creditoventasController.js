const CreditoVentas = require('../../models/creditos/CreditoVentas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarCreditoVentas = async (req, res) => {
    const creditos = await CreditoVentas.find();

    if (creditos.length === 0) {
        return res.send('No se encontraron creditos');
    }
    else {
        res.send(creditos);
    }
}

exports.mostrarCreditoVentasPaginados = async (req, res) => {
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
    result= await CreditoVentas.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron creditos');
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

exports.crearCreditoVentas = async (req, res) => {
    const creditos = new CreditoVentas({
        cantidad: req.body.cantidad,
        fecha_limite: req.body.fecha_limite,
        venta: req.body.venta,
    });

    creditos.save(function (err, creditos) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(creditos);
    });
}

exports.actualizarCreditoVentas = async (req, res) => {
    const body = req.body;
    CreditoVentas.updateOne({ _id: body._id }, {
        $set: {
            cantidad: body.cantidad,
            fecha_limite: body.fecha_limite,
            venta: body.venta,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar el credito',
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

exports.eliminarCreditoVentas = async (req, res) => {
    const body = req.body;
    CreditoVentas.updateOne({ _id: body._id }, {
        $set: {
            cantidad: body.cantidad,
            fecha_limite: body.fecha_limite,
            venta: body.venta,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar el credito',
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

exports.activarCreditoVentas = async (req, res) => {
    const body = req.body;
    CreditoVentas.updateOne({ _id: body._id }, {
        $set: {
            cantidad: body.cantidad,
            fecha_limite: body.fecha_limite,
            venta: body.venta,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar el credito',
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