const Aperturas = require('../../models/caja/Aperturas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarAperturas = async (req, res) => {
    const aperturas = await Aperturas.find();

    if (aperturas.length === 0) {
        return res.send('No se encontraron aperturas');
    }
    else {
        res.send(aperturas);
    }
}

exports.mostrarAperturasPaginados = async (req, res) => {
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
    result= await Aperturas.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron aperturas');
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

exports.crearAperturas = async (req, res) => {
    const aperturas = new Aperturas({
        cantidad: req.body.cantidad,
        caja_chica: req.body.caja_chica,
        responsable: req.body.responsable,
    });

    aperturas.save(function (err, aperturas) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(aperturas);
    });

}

exports.actualizarAperturas = async (req, res) => {
    const body = req.body;
    Aperturas.updateOne({ _id: body._id }, {
        $set: {
            cantidad: body.cantidad,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado,
            caja_chica: body.caja_chica,
            responsable: body.responsable,
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar la apertura',
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

exports.eliminarAperturas = async (req, res) => {
    const body = req.body;
    Aperturas.updateOne({ _id: body._id }, {
        $set: {
            cantidad: body.cantidad,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO',
            caja_chica: body.caja_chica,
            responsable: body.responsable,
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar la apertura',
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
exports.activarAperturas = async (req, res) => {
    const body = req.body;
    Aperturas.updateOne({ _id: body._id }, {
        $set: {
            cantidad: body.cantidad,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO',
            caja_chica: body.caja_chica,
            responsable: body.responsable,
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar la apertura',
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