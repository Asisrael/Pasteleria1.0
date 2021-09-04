const Ventas = require('../../models/ventas/Ventas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarVentas = async (req, res) => {
    const ventas = await Ventas.find();

    if (ventas.length === 0) {
        return res.send('No se encontraron ventas');
    }
    else {
        res.send(ventas);
    }
}

exports.mostrarVentasPaginados = async (req, res) => {
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
    result= await Ventas.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron ventas');
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

exports.crearVentas = async (req, res) => {

}

exports.actualizarVentas = async (req, res) => {

}

exports.eliminarVentas = async (req, res) => {
    
}
exports.activarVentas = async (req, res) => {

}