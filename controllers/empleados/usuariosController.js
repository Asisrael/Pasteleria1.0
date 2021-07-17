const Usuarios = require('../../models/empleados/Usuarios');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarUsuarios = async (req, res) => {
    const usuarios = await Usuarios.find();
    res.send(usuarios);
}

exports.mostrarUsuariosPaginados = async (req, res) => {

}

exports.crearUsuario = async (req, res) => {

    console.log(req.body)

    //Revisar si hay errores

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    //extraer usr y password
    const { user, password } = req.body;

    try {
        //Revisar que el usuario sea unico
        let usuario = await Usuarios.findOne({ user });

        if (usuario) {
            return res.status(400).json({ msg: 'El usuario ya fue registrado previamente' });
        }
        //crea nuevo usuario
        usuario = new Usuarios(req.body);

        //hash password
        const salt = await md5(password);
        usuario.password = salt;

        //guarda nuevo usuario
        await usuario.save();

        //Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //Firmar el jwt
        jwt.sign(payload, process.env.VERIFICADOR, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;

            //Mensaje de confirmacion
            res.json({ token });
        });

        res.send('Usuario guardado correctamente');
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

exports.actualizarUsuario = async (req, res) => {

}

exports.eliminarUsuario = async (req, res) => {

}