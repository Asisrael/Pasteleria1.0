const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const DetalleComprasSchema = mongoose.Schema({
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
    compra: {
        type: Schema.ObjectId,
        ref: 'Compras',
        required: true,
    },
    insumos: {
        type: Schema.ObjectId,
        ref: 'Insumos',
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

module.exports = mongoose.model('DetalleCompras', DetalleComprasSchema);