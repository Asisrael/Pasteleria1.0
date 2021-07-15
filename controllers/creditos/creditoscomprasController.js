const CreditosCompras = require('../../models/creditos/CreditosCompras');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarCreditosCompras = async (req, res) => {
    res.send('tipos de cliente')
}

exports.mostrarCreditosComprasPaginados = async (req, res) => {

}

exports.crearCreditosCompras = async (req, res) => {

}

exports.actualizarCreditosCompras = async (req, res) => {

}

exports.eliminarCreditosCompras = async (req, res) => {
    
}