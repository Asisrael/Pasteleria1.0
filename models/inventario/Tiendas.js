const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const TiendasSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    direccion: {
        type: String,
        trim: true,
        required: true
    },
    latitud: {
        type: String,
        trim: true,
    },
    longitud: {
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
    }
});
TiendasSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Tiendas', TiendasSchema);