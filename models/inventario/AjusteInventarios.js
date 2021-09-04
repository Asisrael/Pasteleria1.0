const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');
const AjusteInventariosSchema = mongoose.Schema({
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
    responsable: {
        type: Schema.ObjectId,
        ref: 'Usuarios',
        required: true,
    },
    producto: {
        type: Schema.ObjectId,
        ref: 'Productos',
        required: true,
    },
});
AjusteInventariosSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('AjusteInventarios', AjusteInventariosSchema);