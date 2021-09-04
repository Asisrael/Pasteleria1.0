const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const ComprasSchema = mongoose.Schema({
    fecha_compra: {
        type: Date,
        required: true,
    },
    total: {
        type: String,
        trim: true,
        required: true,
    },
    iva_compra: {
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
    proveedor: {
        type: Schema.ObjectId,
        ref: 'Proveedores',
        required: true,
    },
    responsable: {
        type: Schema.ObjectId,
        ref: 'Usuarios',
        required: true,
    },
});
ComprasSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Compras', ComprasSchema);