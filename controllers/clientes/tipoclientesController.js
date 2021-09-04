const TipoClientes = require('../../models/clientes/TipoClientes');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarTipoClientes = async (req, res) => {
    const tipos = await TipoClientes.find();

    if (tipos.length === 0) {
        return res.send('No se encontraron tipos de cliente');
    }
    else {
        res.send(tipos);
    }
}

exports.mostrarTipoClientesPaginados = async (req, res) => {
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
    result= await TipoClientes.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron tipos de cliente');
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

exports.crearTipoClientes = async (req, res) => {
    const tipos = new TipoClientes({
        nombre: req.body.nombre,
    });

    tipos.save(function (err, tipos) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(tipos);
    });
}

exports.actualizarTipoClientes = async (req, res) => {
    const body = req.body;
    TipoClientes.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo actualizar el tipo de cliente',
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

exports.eliminarTipoClientes = async (req, res) => {
    const body = req.body;
    TipoClientes.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo eliminar el tipo de cliente',
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
exports.activarTipoClientes = async (req, res) => {
    const body = req.body;
    TipoClientes.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo activar el tipo de cliente',
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