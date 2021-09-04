const Maquinaria = require('../../models/maquinaria/Maquinarias');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarMaquinaria = async (req, res) => {
    const maquinaria = await Maquinaria.find();

    if (maquinaria.length === 0) {
        return res.send('No se encontro la  maquinaria');
    }
    else {
        res.send(maquinaria);
    }
}

exports.mostrarMaquinariaPaginados = async (req, res) => {
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
    result= await Maquinaria.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontró maquinaria');
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

exports.crearMaquinaria = async (req, res) => {
    const maquinaria = new Maquinaria({
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        frecuencia: req.body.frecuencia,
    });

    maquinaria.save(function (err, maquinaria) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(maquinaria);
    });

}

exports.actualizarMaquinaria = async (req, res) => {
    const body = req.body;
    Maquinaria.updateOne({ _id: body._id }, {
        $set: {
            nombre: body.nombre,
            frecuencia: body.frecuencia,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar la maquinaria',
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

exports.eliminarMaquinaria = async (req, res) => {
    const body = req.body;
    Maquinaria.updateOne({ _id: body._id }, {
        $set: {
            nombre: body.nombre,
            frecuencia: body.frecuencia,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar la maquinaria',
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
exports.activarMaquinaria = async (req, res) => {
    const body = req.body;
    Maquinaria.updateOne({ _id: body._id }, {
        $set: {
            nombre: body.nombre,
            frecuencia: body.frecuencia,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar la maquinaria',
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