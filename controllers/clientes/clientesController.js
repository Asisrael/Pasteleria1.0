const Clientes = require('../../models/clientes/Clientes');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarClientes = async (req, res) => {
    res.send('hola');
}

exports.mostrarClientesPaginados = async (req, res) => {

}

exports.crearClientes = async (req, res) => {

}

exports.actualizarClientes = async (req, res) => {

}

exports.eliminarClientes = async (req, res) => {

}