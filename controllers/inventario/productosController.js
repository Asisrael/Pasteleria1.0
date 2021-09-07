const Productos = require('../../models/inventario/Productos');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarProductos = async (req, res) => {
    const productos = await Productos.find();

    if (productos.length === 0) {
        return res.send('No se encontraron productos');
    }
    else {
        res.send(productos);
    }
}

exports.mostrarProductosPaginados = async (req, res) => {
    let actualPage = parseInt(req.query.page);
    let perPage = parseInt(req.query.per_page);
    let filter = req.query.sort;
    let order = req.query.order;
    let search = req.query.search;
    if(!order){
        filter='registro';
        order='desc';
    }
    order = (order =='desc'|| order == -1)? -1 : 1;
    let columna=req.query.columna;
   
   
    const regex = new RegExp(search, 'i');
    result= await Productos.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]},populate:[{
        path: 'color',
        select: '_id nombre'
    },{
        path: 'tipo_producto',
        select: '_id nombre'
    },{
        path: 'talla',
        select: '_id nombre'
    },{
        path: 'marca',
        select: '_id nombre'
    }]});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron productos');
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

exports.crearProductos = async (req, res) => {
    const body = req.body;
    const productos = new Productos({
        nombre: body.nombre,
        codigo_barras: req.body.codigo_barras,
        caracteristicas: req.body.caracteristicas,
        minimo: req.body.minimo,
        precio_costo: req.body.precio_costo,
        precio_venta: req.body.precio_venta,
        tipo_producto: req.body.tipo_producto,
        existencia: req.body.existencia,
    });

    productos.save(function (err, productos) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(productos);
    });
}

exports.actualizarProductos = async (req, res) => {
    const body = req.body;
    Productos.updateOne({ _id: body._id }, {
        $set: {
            nombre: body.nombre,
            codigo_barras: req.body.codigo_barras,
            caracteristicas: req.body.caracteristicas,
            minimo: req.body.minimo,
            precio_costo: req.body.precio_costo,
            precio_venta: req.body.precio_venta,
            tipo_producto: req.body.tipo_producto,
            existencia: req.body.existencia,
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

exports.eliminarProductos = async (req, res) => {
    const body = req.body;
    Productos.updateOne({ _id: body._id }, {
        $set: {
            nombre: body.nombre,
            codigo_barras: req.body.codigo_barras,
            caracteristicas: req.body.caracteristicas,
            minimo: req.body.minimo,
            precio_costo: req.body.precio_costo,
            precio_venta: req.body.precio_venta,
            tipo_producto: req.body.tipo_producto,
            existencia: req.body.existencia,
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

exports.activarProductos = async (req, res) => {
    const body = req.body;
    Productos.updateOne({ _id: body._id }, {
        $set: {
            nombre: body.nombre,
            codigo_barras: req.body.codigo_barras,
            caracteristicas: req.body.caracteristicas,
            minimo: req.body.minimo,
            precio_costo: req.body.precio_costo,
            precio_venta: req.body.precio_venta,
            tipo_producto: req.body.tipo_producto,
            existencia: req.body.existencia,
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