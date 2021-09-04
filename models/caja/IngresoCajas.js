const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const IngresoCajasSchema = mongoose.Schema({
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
    },
    venta: {
        type: Schema.ObjectId,
        ref: 'Ventas',
        required: true,
    }
});
IngresoCajasSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('IngresoCajas', IngresoCajasSchema);