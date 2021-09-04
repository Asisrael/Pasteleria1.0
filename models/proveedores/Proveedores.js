const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const ProveedoresSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    telefono: {
        type: String,
        trim: true,
        required: true,
    },
    correo: {
        type: String,
        trim: true,
        required: true,
    },
    nit: {
        type: String,
        trim: true,
        required: true,
    },
    direccion: {
        type: String,
        trim: true,
    },
    codigo_proveedor: {
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
    marca: {
        type: Schema.ObjectId,
        ref: 'Marcas',
        required: true,
    },
    divisa: {
        type: Schema.ObjectId,
        ref: 'Divisas',
        required: true,
    }
});
ProveedoresSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Proveedores', ProveedoresSchema);