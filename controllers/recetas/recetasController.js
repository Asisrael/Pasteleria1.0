const Recetas = require('../../models/recetas/Recetas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarRecetas = async (req, res) => {
    res.send('tipos de cliente')
}

exports.mostrarRecetasPaginados = async (req, res) => {

}

exports.crearRecetas = async (req, res) => {

}

exports.actualizarRecetas = async (req, res) => {

}

exports.eliminarRecetas = async (req, res) => {
    
}
exports.activarRecetas = async (req, res) => {

}