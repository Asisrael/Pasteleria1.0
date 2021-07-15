const MateriaDecoraciones = require('../../models/inventario/MateriaDecoraciones');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarMateriaDecoraciones = async (req, res) => {
    res.send('tipos de cliente')
}

exports.mostrarMateriaDecoracionesPaginados = async (req, res) => {

}

exports.crearMateriaDecoraciones = async (req, res) => {

}

exports.actualizarMateriaDecoraciones = async (req, res) => {

}

exports.eliminarMateriaDecoraciones = async (req, res) => {
    
}