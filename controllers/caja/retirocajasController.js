const RetiroCajas = require('../../models/caja/RetiroCajas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarRetiroCajas = async (req, res) => {
    const retiros = await RetiroCajas.find();

    if (retiros.length === 0) {
        return res.send('No se encontraron retiros');
    }
    else {
        res.send(retiros);
    }
}

exports.mostrarRetiroCajasPaginados = async (req, res) => {
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
    result= await RetiroCajas.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron retiros');
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

exports.crearRetiroCajas = async (req, res) => {
    const retiros = new RetiroCajas({
        caja_chica: req.body.caja_chica,
        responsable: req.body.responsable,
    });

    retiros.save(function (err, retiros) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(retiros);
    });
}

exports.actualizarRetiroCajas = async (req, res) => {
    const body = req.body;
    RetiroCajas.updateOne({ _id: body._id }, {
        $set: {
            caja_chica: body.caja_chica,
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
                    msg: 'No se pudo actualizar el retiro',
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

exports.eliminarRetiroCajas = async (req, res) => {
    const body = req.body;
    RetiroCajas.updateOne({ _id: body._id }, {
        $set: {
            caja_chica: body.caja_chica,
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
                    msg: 'No se pudo eliminar el retiro',
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
exports.activarRetiroCajas = async (req, res) => {
    const body = req.body;
    RetiroCajas.updateOne({ _id: body._id }, {
        $set: {
            caja_chica: body.caja_chica,
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
                    msg: 'No se pudo activar el retiro',
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