const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const LotesSchema = mongoose.Schema({
    fecha_ingresado: {
        type: Date,
    },
    fecha_caducidad: {
        type: Date,
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
    productos: {
        type: Schema.ObjectId,
        ref: 'Productos',
        required: true,
    },
});
LotesSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Lotes', LotesSchema);