const Lotes = require('../../models/inventario/Lotes');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarLotes = async (req, res) => {
    const lotes = await Lotes.find();

    if (lotes.length === 0) {
        return res.send('No se encontraron lotes');
    }
    else {
        res.send(lotes);
    }
}

exports.mostrarLotesPaginados = async (req, res) => {
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
    result= await Lotes.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron lotes');
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

exports.crearLotes = async (req, res) => {
    const lotes = new Lotes({
        fecha_caducidad: req.body.fecha_caducidad,
        fecha_ingresado: req.body.fecha_ingresado,
        codigo_lote: req.body.codigo_lote,
        productos: req.body.productos,
    });

    lotes.save(function (err, lotes) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(lotes);
    });
}

exports.actualizarLotes = async (req, res) => {
    const body = req.body;
    Lotes.updateOne({ _id: body._id }, {
        $set: {
            fecha_caducidad: req.body.fecha_caducidad,
            fecha_ingresado: req.body.fecha_ingresado,
            codigo_lote: req.body.codigo_lote,
            productos: req.body.productos,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar el lote',
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

exports.eliminarLotes = async (req, res) => {
    const body = req.body;
    Lotes.updateOne({ _id: body._id }, {
        $set: {
            fecha_caducidad: req.body.fecha_caducidad,
            fecha_ingresado: req.body.fecha_ingresado,
            codigo_lote: req.body.codigo_lote,
            productos: req.body.productos,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar el lote',
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

exports.activarLotes = async (req, res) => {
    const body = req.body;
    Lotes.updateOne({ _id: body._id }, {
        $set: {
            fecha_caducidad: req.body.fecha_caducidad,
            fecha_ingresado: req.body.fecha_ingresado,
            codigo_lote: req.body.codigo_lote,
            productos: req.body.productos,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar el lote',
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