const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const MaquinariasSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    frecuencia: {
        type: String,
        trime: true,
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
MaquinariasSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Maquinarias', MaquinariasSchema);