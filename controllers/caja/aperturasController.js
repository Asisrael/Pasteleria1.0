const Aperturas = require('../../models/caja/Aperturas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarAperturas = async (req, res) => {
    res.send('indexAperturas') ;

}

exports.mostrarAperturasPaginados = async (req, res) => {

}

exports.crearAperturas = async (req, res) => {

}

exports.actualizarAperturas = async (req, res) => {

}

exports.eliminarAperturas = async (req, res) => {

}
exports.activarAperturas = async (req, res) => {

}