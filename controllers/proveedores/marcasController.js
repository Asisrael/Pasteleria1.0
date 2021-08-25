const Marcas = require('../../models/proveedores/Marcas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5');
const { restart } = require('nodemon');

exports.mostrarMarcas = async (req, res) => {
    const marcas = await Marcas.find();

    if (marcas.length === 0) {
        return res.send('No se encontraron marcas');
    }
    else {
        res.send(marcas);
    }
}

exports.mostrarMarcasPaginados = async (req, res) => {
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
    result= await Marcas.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
  
    if (result.length === 0) {
        return res.send('No se encontraron marcas');
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

exports.crearMarcas = async (req, res) => {
    const marcas = new Marcas({
        nombre: req.body.nombre,
    });

    marcas.save(function (err, marcas) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(marcas);
    });
}

exports.actualizarMarcas = async (req, res) => {
    const body = req.body;
    Marcas.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo actualizar la marca',
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

exports.eliminarMarcas = async (req, res) => {
    const body = req.body;
    Marcas.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo eliminar la marca',
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
exports.activarMarcas = async (req, res) => {
    const body = req.body;
    Marcas.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudo activar la marca',
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