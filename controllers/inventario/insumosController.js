const Insumos = require('../../models/inventario/Insumos');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarInsumos = async (req, res) => {
    res.send('tipos de cliente')
}

exports.mostrarInsumosPaginados = async (req, res) => {

}

exports.crearInsumos = async (req, res) => {

}

exports.actualizarInsumos = async (req, res) => {

}

exports.eliminarInsumos = async (req, res) => {
    
}