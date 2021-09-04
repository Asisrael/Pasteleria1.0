const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const DetalleVentasSchema = mongoose.Schema({
    cantidad: {
        type: String,
        trim: true,
        required: true,
    },
    subtotal: {
        type: String,
        trim: true,
        required: true,
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
    venta: {
        type: Schema.ObjectId,
        ref: 'Ventas',
        required: true,
    },
    productos: {
        type: Schema.ObjectId,
        ref: 'Productos',
        required: true,
    },
    decoraciones: {
        type: Schema.ObjectId,
        ref: 'MateriaDecoraciones',
        required: true,
    },
    pasteles: {
        type: Schema.ObjectId,
        ref: 'MateriaPasteles',
        required: true,
    },
    variedades: {
        type: Schema.ObjectId,
        ref: 'Variedades',
        required: true,
    },
});

module.exports = mongoose.model('DetalleVentas', DetalleVentasSchema);