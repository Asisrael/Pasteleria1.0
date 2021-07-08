const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CajaChicasSchema = mongoose.Schema({
    total: {
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
    tienda: {
        type: Schema.ObjectId,
        ref: 'Tiendas',
        required: true,
    }
});

module.exports = mongoose.model('CajaChicas', CajaChicasSchema);