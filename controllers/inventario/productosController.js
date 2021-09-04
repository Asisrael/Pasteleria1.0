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
    
}

exports.actualizarProductos = async (req, res) => {
  
}

exports.eliminarProductos = async (req, res) => {
    
}
exports.activarProductos = async (req, res) => {

}