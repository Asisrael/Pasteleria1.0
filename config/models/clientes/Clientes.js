const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ClientesSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true,
    },
    telefono: {
        type: String,
        trim: true,
    },
    correo: {
        type: String,
        trim: true,
        required: true,
    },
    nit: {
        type: String,
        trim: true,
        required: true,
    },
    direccion: {
        type: String,
        trim: true,
        required: true,
    },
    codigo: {
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
    estado: {
        type: String,
        trim: true,
        required: true,
        default: 'ACTIVO',
    },
    tipo_cliente: {
        type: Schema.ObjectId,
        ref: 'TipoClientes',
        required: true,
    }
});

module.exports = mongoose.model('Clientes', ClientesSchema);
