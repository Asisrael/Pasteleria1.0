const Cierres = require('../../models/caja/Cierres');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarCierres = async (req, res) => {
    const cierres = await Cierres.find();

    if (cierres.length === 0) {
        return res.send('No se encontraron cierres');
    }
    else {
        res.send(cierres);
    }

}

exports.mostrarCierresPaginados = async (req, res) => {
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
    result= await Cierres.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron cierres');
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

exports.crearCierres = async (req, res) => {
    const cierres = new Cierres({
        total: req.body.total,
        tienda: req.body.tienda,
    });

    cierres.save(function (err, cierres) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(cierres);
    });
}

exports.actualizarCierres = async (req, res) => {
    const body = req.body;
    Cierres.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo actualizar el cierre',
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

exports.eliminarCierres = async (req, res) => {
    const body = req.body;
    Cierres.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo eliminar el cierre',
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
exports.activarCierres = async (req, res) => {

    const body = req.body;
    Cierres.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo activar el cierre',
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