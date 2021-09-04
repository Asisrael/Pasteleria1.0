const Tiendas = require('../../models/inventario/Tiendas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarTiendas = async (req, res) => {
    const tiendas = await Tiendas.find();

    if (tiendas.length === 0) {
        return res.send('No se encontraron tiendas');
    }
    else {
        res.send(tiendas);
    }
}

exports.mostrarTiendasPaginados = async (req, res) => {
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
    result= await Tiendas.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron tiendas');
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

exports.crearTiendas = async (req, res) => {
    const tiendas = new Tiendas({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        latitud: req.body.latitud,
        longitud: req.body.longitud,
    });

    tiendas.save(function (err, tiendas) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(tiendas);
    });
}

exports.actualizarTiendas = async (req, res) => {
    const body = req.body;
    Tiendas.updateOne({ _id: body._id }, {
        $set: {
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            latitud: req.body.latitud,
            longitud: req.body.longitud,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar la tienda',
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

exports.eliminarTiendas = async (req, res) => {
    const body = req.body;
    Tiendas.updateOne({ _id: body._id }, {
        $set: {
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            latitud: req.body.latitud,
            longitud: req.body.longitud,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar la tienda',
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

exports.activarTiendas = async (req, res) => {
    const body = req.body;
    Tiendas.updateOne({ _id: body._id }, {
        $set: {
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            latitud: req.body.latitud,
            longitud: req.body.longitud,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar la tienda',
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