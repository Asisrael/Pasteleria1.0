const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UsuariosSchema = mongoose.Schema({
    user: {
        type: String,
        trim: true,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        trim: true,
    },
    nombre: {
        type: String,
        trim: true,
        required: true,
    },
    telefono: {
        type: String,
        trim: true,
        required: true,
    },
    correo: {
        type: String,
        trim: true,
    },
    cui: {
        type: String,
        trim: true,
        required: true,
    },
    contratacion: {
        type: String,
        trim: true,
        required: true
    },
    puesto: {
        type: String,
        trim: true,
    },
    registro: {
        type: Date,
        default: Date.now()
    },
    actualizacion: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('Usuarios', UsuariosSchema);