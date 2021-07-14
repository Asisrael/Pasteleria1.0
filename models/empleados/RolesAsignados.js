const mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
        type: Schema.ObjectId,
        ref: 'Roles',
        required: true,
    },
    usuarios: {
        type: Schema.ObjectId,
        ref: 'Usuarios',
        required: true,
    }
});

module.exports = mongoose.model('RolesAsignados', RolesAsignadosSchema);