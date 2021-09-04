const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const VentasSchema = mongoose.Schema({
    fecha_venta: {
        type: Date,
        required: true,
    },
    total: {
        type: String,
        trim: true,
        required: true,
    },
    iva_venta: {
        type: String,
        trim: true,
        required: true,
    },
    descuento: {
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
    },
    cliente: {
        type: Schema.ObjectId,
        ref: 'Clientes',
        required: true,
    },
    responsable: {
        type: Schema.ObjectId,
        ref: 'Usuarios',
        required: true,
    },
});
VentasSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Ventas', VentasSchema);