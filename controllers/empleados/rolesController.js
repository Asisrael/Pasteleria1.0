const Roles = require('../../models/empleados/Roles');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarRoles = async (req, res) => {
    res.send('tipos de cliente')
}

exports.mostrarRolesPaginados = async (req, res) => {

}

exports.crearRoles = async (req, res) => {

}

exports.actualizarRoles = async (req, res) => {

}

exports.eliminarRoles = async (req, res) => {
    
}