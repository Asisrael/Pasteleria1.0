const DetalleCompras = require('../../models/compras/DetalleCompras');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarDetalleCompras = async (req, res) => {
    const detalles = await DetalleCompras.find();

    if (detalles.length === 0) {
        return res.send('No se encontraron detalles de compra');
    }
    else {
        res.send(detalles);
    }
}

exports.mostrarDetalleComprasPaginados = async (req, res) => {
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
    result= await DetalleCompras.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron detalles de compra');
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

exports.crearDetalleCompras = async (req, res) => {

}

exports.actualizarDetalleCompras = async (req, res) => {

}

exports.eliminarDetalleCompras = async (req, res) => {

}
exports.activarDetalleCompras = async (req, res) => {

}