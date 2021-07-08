const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const AperturasSchema = mongoose.Schema({
    cantidad: {
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
    caja_chica: {
        type: Schema.ObjectId,
        ref: 'CajaChicas',
        required: true,
    }
});

module.exports = mongoose.model('Aperturas', AperturasSchema);