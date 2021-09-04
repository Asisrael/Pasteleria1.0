const CuentaBancaria = require('../../models/caja/CuentaBancaria');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarCuentaBancaria = async (req, res) => {
    const cuentas = await CuentaBancaria.find();

    if (cuentas.length === 0) {
        return res.send('No se encontraron cuentas');
    }
    else {
        res.send(cuentas);
    }
}

exports.mostrarCuentaBancariaPaginados = async (req, res) => {
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
    result= await CuentaBancaria.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron cuentas');
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

exports.crearCuentaBancaria = async (req, res) => {
    const cuentas = new CuentaBancaria({
        cantidad: req.body.cantidad,
        caja_chica: req.body.caja_chica,
    });

    cuentas.save(function (err, cuentas) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(cuentas);
    });
}

exports.actualizarCuentaBancaria = async (req, res) => {
    const body = req.body;
    CuentaBancaria.updateOne({ _id: body._id }, {
        $set: {
            cantidad: body.cantidad,
            caja_chica: body.caja_chica,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar la cuenta',
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

exports.eliminarCuentaBancaria = async (req, res) => {
    const body = req.body;
    CuentaBancaria.updateOne({ _id: body._id }, {
        $set: {
            cantidad: body.cantidad,
            caja_chica: body.caja_chica,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar la cuenta',
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
exports.activarCuentaBancaria = async (req, res) => {
    const body = req.body;
    CuentaBancaria.updateOne({ _id: body._id }, {
        $set: {
            cantidad: body.cantidad,
            caja_chica: body.caja_chica,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar la cuenta',
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