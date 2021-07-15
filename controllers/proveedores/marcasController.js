const Marcas = require('../../models/proveedores/Marcas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarMarcas = async (req, res) => {
    res.send('tipos de cliente')
}

exports.mostrarMarcasPaginados = async (req, res) => {

}

exports.crearMarcas = async (req, res) => {

}

exports.actualizarMarcas = async (req, res) => {

}

exports.eliminarMarcas = async (req, res) => {
    
}