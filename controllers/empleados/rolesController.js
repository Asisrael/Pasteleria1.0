const Roles = require('../../models/empleados/Roles');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarRoles = async (req, res) => {
    const roles = await Roles.find();

    if (roles.length === 0) {
        return res.send('No se encontraron roles');
    }
    else {
        res.send(roles);
    }
}

exports.mostrarRolesPaginados = async (req, res) => {
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
    result= await Roles.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron roles');
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

exports.crearRoles = async (req, res) => {
    const roles = new Roles({
        nombre: req.body.nombre,
       
    });

    roles.save(function (err, roles) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(roles);
    });
}

exports.actualizarRoles = async (req, res) => {
    const body = req.body;
   Roles.updateOne({ _id: body._id }, {
        $set: {
            nombre: req.body.nombre,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar el rol',
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

exports.eliminarRoles = async (req, res) => {
    const body = req.body;
    Roles.updateOne({ _id: body._id }, {
        $set: {
            nombre: req.body.nombre,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar el rol',
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
exports.activarRoles = async (req, res) => {
    const body = req.body;
    Roles.updateOne({ _id: body._id }, {
        $set: {
            nombre: req.body.nombre,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar el rol',
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