const MateriaPasteles = require('../../models/inventario/MateriaPasteles');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarMateriaPasteles = async (req, res) => {
    res.send('tipos de cliente')
}

exports.mostrarMateriaPastelesPaginados = async (req, res) => {

}

exports.crearMateriaPasteles = async (req, res) => {

}

exports.actualizarMateriaPasteles = async (req, res) => {

}

exports.eliminarMateriaPasteles = async (req, res) => {
    
}