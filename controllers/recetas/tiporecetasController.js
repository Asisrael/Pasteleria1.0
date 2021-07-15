const TipoRecetas = require('../../models/recetas/TipoRecetas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarTipoRecetas = async (req, res) => {
    res.send('tipos de cliente')
}

exports.mostrarTipoRecetasPaginados = async (req, res) => {

}

exports.crearTipoRecetas = async (req, res) => {

}

exports.actualizarTipoRecetas = async (req, res) => {

}

exports.eliminarTipoRecetas = async (req, res) => {
    
}