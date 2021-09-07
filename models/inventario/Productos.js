const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;
const ProductosSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    codigo_barras: {
        type: String,
        trim: true,
    },
    caracteristicas: {
        type: String,
        trim: true,
    },
    minimo: {
        type: String,
        trim: true,
    },
    precio_costo: {
        type: String,
        trim: true,
    },
    precio_venta: {
        type: String,
        trim: true,
    },
    existencia: {
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
    tipo_producto: {
        type: Schema.ObjectId,
        ref: 'TipoProductos',
        required: true,
    }
});
ProductosSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Productos', ProductosSchema);