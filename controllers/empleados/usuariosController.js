const Usuarios = require('../../models/empleados/Usuarios');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarUsuarios = async (req, res) => {
    res.send('tipos de cliente')
}

exports.mostrarUsuariosPaginados = async (req, res) => {

}

exports.crearUsuarios = async (req, res) => {

}

exports.actualizarUsuarios = async (req, res) => {

}

exports.eliminarUsuarios = async (req, res) => {
    
}