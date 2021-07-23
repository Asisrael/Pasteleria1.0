const Compras = require('../../models/compras/Compras');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarCompras = async (req, res) => {
    res.send('compras');
}

exports.mostrarComprasPaginados = async (req, res) => {

}

exports.crearCompras = async (req, res) => {

}

exports.actualizarCompras = async (req, res) => {

}

exports.eliminarCompras = async (req, res) => {

}
exports.activarCompras = async (req, res) => {

}