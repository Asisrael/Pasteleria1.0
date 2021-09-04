const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const RecetasVentasSchema = mongoose.Schema({
    receta: {
        type: Array,
        required: true
    },
    costo_receta:{
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
RecetasVentasSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('RecetasVentas', RecetasVentasSchema);