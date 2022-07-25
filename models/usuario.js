
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    cedula: {
        type: Number,
        required: [true, 'El numero de cedula es obligatorio'],
        unique: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    fechaNacimiento: {
        type: Date,
        required: [false, 'La fecha de nacimiento es obligatoria'],
    },
    direccion: {
        type: String,
        required: [false, 'La direccion es obligatoria'],
    },
    telefono: {
        type: Number,
        required: [false, 'El telefono es obligatorio'],
    },
    estadoVacunas: {
        type: String,
        required: false,
        default: "No vacunado",
        enum: ['No vacunado', 'Vacunado']
    },
    tipoDeVacuna: {
        type: String,
        required: false,
        default: "Ninguna",
        enum: ['Sputnik', 'AstraZeneca', 'Pfizer', ' Jhonson&Jhonson', 'Ninguna']
    },
    fechaDeVacunacion: {
        type: Date,
        default:'01/01/2020', 
        required: false,
    },
    numeroDosis: {
        type: Number,
        default: 0,
        required: false,
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        default: 'employee_role',
        emun: ['admin_role', 'employee_role']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});



UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);
