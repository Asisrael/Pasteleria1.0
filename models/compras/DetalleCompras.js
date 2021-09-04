const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const DetalleComprasSchema = mongoose.Schema({
    cantidad: {
        type: String,
        trim: true,
        required: true,
    },
    subtotal: {
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
    compra: {
        type: Schema.ObjectId,
        ref: 'Compras',
        required: true,
    },
    productos: {
        type: Schema.ObjectId,
        ref: 'Productos',
        required: true,
    },
});
DetalleComprasSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('DetalleCompras', DetalleComprasSchema);