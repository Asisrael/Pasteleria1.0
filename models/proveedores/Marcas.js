const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
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
MarcasSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Marcas', MarcasSchema);