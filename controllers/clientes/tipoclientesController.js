const TipoClientes = require('../../models/clientes/TipoClientes');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarTipoClientes = async (req, res) => {
    res.send('tipos de cliente')
}

exports.mostrarTipoClientesPaginados = async (req, res) => {

}

exports.crearTipoClientes = async (req, res) => {

}

exports.actualizarTipoClientes = async (req, res) => {

}

exports.eliminarTipoClientes = async (req, res) => {
    
}