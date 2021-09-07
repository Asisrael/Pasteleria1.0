const Compras = require('../../models/compras/Compras');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarCompras = async (req, res) => {
    const compras = await Compras.find();

    if (compras.length === 0) {
        return res.send('No se encontraron compras');
    }
    else {
        res.send(compras);
    }
}

exports.mostrarComprasPaginados = async (req, res) => {
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
    result= await Compras.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron compras');
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

exports.crearCompras = async (req, res) => {
    const compras = new Compras({
        fecha_compra: req.body.fecha_compra,
        total: req.body.total,
        iva_compra: req.body.iva_compra,
        proveedor: req.body.proveedor,
        responsable: req.body.responsable,
    });

    compras.save(function (err, compras) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(compras);
    });
}

exports.actualizarCompras = async (req, res) => {
    const body = req.body;
    Compras.updateOne({ _id: body._id }, {
        $set: {
            fecha_compra: body.fecha_compra,
            total: body.total,
            iva_compra: body.iva_compra,
            proveedor: body.proveedor,
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
                    msg: 'No se pudo actualizar la compra',
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

exports.eliminarCompras = async (req, res) => {
    const body = req.body;
    Compras.updateOne({ _id: body._id }, {
        $set: {
            fecha_compra: body.fecha_compra,
            total: body.total,
            iva_compra: body.iva_compra,
            proveedor: body.proveedor,
            responsable: body.responsable,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar la compra',
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

exports.activarCompras = async (req, res) => {
    const body = req.body;
    Compras.updateOne({ _id: body._id }, {
        $set: {
            fecha_compra: body.fecha_compra,
            total: body.total,
            iva_compra: body.iva_compra,
            proveedor: body.proveedor,
            responsable: body.responsable,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar la compra',
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