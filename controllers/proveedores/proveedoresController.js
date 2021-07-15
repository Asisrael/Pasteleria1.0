const Proveedores = require('../../models/proveedores/Proveedores');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarProveedores = async (req, res) => {
    res.send('tipos de cliente')
}

exports.mostrarProveedoresPaginados = async (req, res) => {

}

exports.crearProveedores = async (req, res) => {

}

exports.actualizarProveedores = async (req, res) => {

}

exports.eliminarProveedores = async (req, res) => {
    
}