const Variedades = require('../../models/inventario/Variedades');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarVariedades = async (req, res) => {
    res.send('tipos de cliente')
}

exports.mostrarVariedadesPaginados = async (req, res) => {

}

exports.crearVariedades = async (req, res) => {

}

exports.actualizarVariedades = async (req, res) => {

}

exports.eliminarVariedades = async (req, res) => {
    
}