const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const RecetasSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    receta_base: {
        type: Array,
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
RecetasSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Recetas', RecetasSchema);