const Proveedores = require('../../models/proveedores/Proveedores');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarProveedores = async (req, res) => {
    const proveedores = await Proveedores.find();

    if (proveedores.length === 0) {
        return res.send('No se encontraro el proveedor');
    }
    else {
        res.send(proveedores);
    }
}
exports.mostrarProveedoresPaginados = async (req, res) => {
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
    result= await Proveedores.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]},populate:{
        path: 'empresa',
        select: '_id nombre'
    }});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron proveedores');
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

exports.crearProveedores = async (req, res) => {
    const proveedores = new Proveedores({
        nombre: req.body.nombre,
        
    });

    proveedores.save(function (err, proveedores) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(proveedores);
    });

}

exports.actualizarProveedores = async (req, res) => {
    const body = req.body;
    Proveedores.updateOne({ _id: body._id }, {
        $set: {
            nombre: body.nombre,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar el proveedor',
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

exports.eliminarProveedores = async (req, res) => {
    const body = req.body;
    proveedores.updateOne({ _id: body._id }, {
        $set: {
            nombre: body.nombre,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar el proveedor',
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
exports.activarProveedores = async (req, res) => {
    const body = req.body;
    Preveedores.updateOne({ _id: body._id }, {
        $set: {
            nombre: body.nombre,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar el proveedor',
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