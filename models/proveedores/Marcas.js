const mongoose = require('mongoose');

const MarcasSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
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
    }
});

module.exports = mongoose.model('Marcas', MarcasSchema);