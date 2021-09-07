const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const RolesAsignadosSchema = mongoose.Schema({
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
    roles: {
        type: Array,
        required: true,
    },
    usuarios: {
        type: Schema.ObjectId,
        ref: 'Usuarios',
        required: true,
    }
});
RolesAsignadosSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('RolesAsignados', RolesAsignadosSchema);