const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const CreditoComprasSchema = mongoose.Schema({
    cantidad: {
        type: String,
        trim: true,
        required: true,
    },
    fecha_limite: {
        type: Date,
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
    compra: {
        type: Schema.ObjectId,
        ref: 'Compras',
        required: true,
    },
});
CreditoComprasSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('CreditoCompras', CreditoComprasSchema);