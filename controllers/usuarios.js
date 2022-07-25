const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers');



const usuariosGet = async (req = request, res = response) => {

    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}


const getUserByUid = async (req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findById(id);

    res.json(usuario);

}




const usuariosPost = async (req, res = response) => {

    const { nombre, apellido, cedula, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, apellido, cedula, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
        usuario,
        token
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosPatch = async (req, res = response) => {

    const { id } = req.params;
    const { fechaNacimiento, direccion, telefono, estadoVacunas, tipoDeVacuna, fechaDeVacunacion, numeroDosis } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, { fechaNacimiento, direccion, telefono, estadoVacunas, tipoDeVacuna, fechaDeVacunacion, numeroDosis });

    res.json({
        msg: "Usuario actualizado",
        usuario
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndRemove(id);

    res.json({
        msg: "Usuario eliminado"
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    getUserByUid
}