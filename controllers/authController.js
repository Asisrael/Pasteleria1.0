const Usuario = require('../models/empleados/Usuarios');
const md5 = require('md5')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    //Revisar si hay errores

    //extraer el usr y el password

    const { user, password } = req.body;

    try {
        //Revisar si el user existe
        let usuario = await Usuario.findOne({ user });
        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        //Revisar el password
        const passCorrecto = await md5(password);
        if (passCorrecto === usuario.password) {
            //Si todo es correcto Crear y firmar el JWT
            const payload = {
                usuario: {
                    id: usuario.id
                }
            };

            //Firmar el jwt
            jwt.sign(payload, process.env.VERIFICADOR, {
                expiresIn: 3600 //Esto indica cuando va a vencer
            }, (error, token) => {
                if (error) throw error;
                //Mensaje de confirmacion
                res.json({ token });
            });
        }
        else {
            return res.status(400).json({ msg: 'La contraseña es incorrecta' })
        }
    } catch (error) {
        console.log(error);
    }
}

//obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({ usuario });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
}