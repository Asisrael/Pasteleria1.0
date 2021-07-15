const CreditosVentas = require('../../models/creditos/CreditosVentas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarCreditosVentas = async (req, res) => {
    res.send('tipos de cliente')
}

exports.mostrarCreditosVentasPaginados = async (req, res) => {

}

exports.crearCreditosVentas = async (req, res) => {

}

exports.actualizarCreditosVentas = async (req, res) => {

}

exports.eliminarCreditosVentas = async (req, res) => {
    
}