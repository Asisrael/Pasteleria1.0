const Divisas = require('../../models/proveedores/Divisas');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarDivisas = async (req, res) => {
    res.send('tipos de cliente')
}

exports.mostrarDivisasPaginados = async (req, res) => {

}

exports.crearDivisas = async (req, res) => {

}

exports.actualizarDivisas = async (req, res) => {

}

exports.eliminarDivisas = async (req, res) => {
    
}