const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const CuentaBancariaSchema = mongoose.Schema({
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
    caja_chica: {
        type: Schema.ObjectId,
        ref: 'CajaChicas',
        required: true,
    }
});
CuentaBancariaSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('CuentaBancaria', CuentaBancariaSchema);