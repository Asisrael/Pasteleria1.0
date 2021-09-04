const IngresoCajas = require('../../models/caja/IngresoCajas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarIngresoCajas = async (req, res) => {
    const ingresos = await IngresoCajas.find();

    if (ingresos.length === 0) {
        return res.send('No se encontraron ingresos');
    }
    else {
        res.send(ingresos);
    }
}

exports.mostrarIngresoCajasPaginados = async (req, res) => {
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
    result= await IngresoCajas.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron ingresos');
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

exports.crearIngresoCajas = async (req, res) => {
    const ingresos = new IngresoCajas({
        venta: req.body.venta,
        caja_chica: req.body.caja_chica,
        responsable: req.body.responsable,
    });

    ingresos.save(function (err, ingresos) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(ingresos);
    });
}

exports.actualizarIngresoCajas = async (req, res) => {
    const body = req.body;
    IngresoCajas.updateOne({ _id: body._id }, {
        $set: {
            venta: body.venta,
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
                    msg: 'No se pudo actualizar el ingreso',
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

exports.eliminarIngresoCajas = async (req, res) => {
    const body = req.body;
    IngresoCajas.updateOne({ _id: body._id }, {
        $set: {
            venta: body.venta,
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
                    msg: 'No se pudo eliminar el ingreso',
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
exports.activarIngresoCajas = async (req, res) => {
    const body = req.body;
    IngresoCajas.updateOne({ _id: body._id }, {
        $set: {
            venta: body.venta,
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
                    msg: 'No se pudo activar el ingreso',
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