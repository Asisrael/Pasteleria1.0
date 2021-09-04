const AjusteInventarios = require('../../models/inventario/AjusteInventarios');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarAjusteInventarios = async (req, res) => {
    const ajustes = await AjusteInventarios.find();

    if (ajustes.length === 0) {
        return res.send('No se encontraron ajustes de inventario');
    }
    else {
        res.send(ajustes);
    }
}

exports.mostrarAjusteInventariosPaginados = async (req, res) => {
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
   
   
    
    if(search!='') {result= await AjusteInventarios.paginate({[columna]:search},{limit:perPage,page:actualPage,sort:{[filter]:[order]},populate:[{
        path: 'responsable',
        select: '_id user'
      },{
        path: 'inventario',
        select: '_id ubicacion'
      }]});}
    else {result= await AjusteInventarios.paginate({},{limit:perPage,page:actualPage,sort:{[filter]:[order]},populate:[{
        path: 'responsable',
        select: '_id user'
      },{
        path: 'inventario',
        select: '_id ubicacion'
      }]});}
    
       
       
    if (result.length === 0) {
        return res.send('No se encontraron ajustes');
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

exports.crearAjusteInventarios = async (req, res) => {
    const ajustes = new AjusteInventarios({
        responsable: req.body.responsable,
        inventario: req.body.inventario,
    });

    ajustes.save(function (err, ajustes) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(ajustes);
    });
}

exports.actualizarAjusteInventarios = async (req, res) => {
    const body = req.body;
    AjusteInventarios.updateOne({ _id: body._id }, {
        $set: {
            responsable: body.responsable,
            inventario: req.body.inventario,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar el ajuste de inventario',
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

exports.eliminarAjusteInventarios = async (req, res) => {
    const body = req.body;
    AjusteInventarios.updateOne({ _id: body._id }, {
        $set: {
            responsable: body.responsable,
            inventario: req.body.inventario,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar el ajuste de inventario',
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

exports.activarAjusteInventarios = async (req, res) => {
    const body = req.body;
    AjusteInventarios.updateOne({ _id: body._id }, {
        $set: {
            responsable: body.responsable,
            inventario: req.body.inventario,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar el ajuste de inventario',
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