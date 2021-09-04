const Divisas = require('../../models/proveedores/Divisas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarDivisas = async (req, res) => {
    const divisas = await Divisas.find();

    if (divisas.length === 0) {
        return res.send('No se encontraron divisas');
    }
    else {
        res.send(divisas);
    }
}

exports.mostrarDivisasPaginados = async (req, res) => {
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
    result= await Divisas.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron divisas');
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

exports.crearDivisas = async (req, res) => {
    const divisas = new Divisas({
        nombre: req.body.nombre,
    });

    divisas.save(function (err, divisas) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(divisas);
    });
}

exports.actualizarDivisas = async (req, res) => {
    const body = req.body;
    Divisas.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudieron actualizar las divisas',
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

exports.eliminarDivisas = async (req, res) => {
    const body = req.body;
    Divisas.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudieron eliminar las divisas',
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
exports.activarDivisas = async (req, res) => {
    const body = req.body;
    Divisas.updateOne({ _id: body._id }, {
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
                    msg: 'No se pudieron activar las divisas',
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