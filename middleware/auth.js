const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Leer el token del header
    const token = req.header('x-auth-token');

    // Revisar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'Permiso no válido' })
    }

    // validar el token
    try {
        const cifrado = jwt.verify(token, process.env.VERIFICADOR);
        req.usuario = cifrado.usuario;

        console.log(cifrado)
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
}