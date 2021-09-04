const Compras = require('../../models/compras/Compras');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarCompras = async (req, res) => {
    const compras = await Compras.find();

    if (compras.length === 0) {
        return res.send('No se encontraron compras');
    }
    else {
        res.send(compras);
    }
}

exports.mostrarComprasPaginados = async (req, res) => {
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
    result= await Compras.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron compras');
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

exports.crearCompras = async (req, res) => {

}

exports.actualizarCompras = async (req, res) => {

}

exports.eliminarCompras = async (req, res) => {

}
exports.activarCompras = async (req, res) => {

}