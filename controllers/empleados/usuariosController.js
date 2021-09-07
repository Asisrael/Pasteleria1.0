const Usuarios = require('../../models/empleados/Usuarios');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const md5 = require('md5')

exports.mostrarUsuarios = async (req, res) => {
    const usuarios = await Usuarios.find();
    res.send(usuarios);
}

exports.mostrarUsuariosPaginados = async (req, res) => {
    let actualPage = parseInt(req.query.page);
    let perPage = parseInt(req.query.per_page);
    let filter = req.query.sort;
    let search = req.query.search;
    let order = req.query.order;
    if(!order){
        filter='registro';
        order='desc';
    }
    order = (order =='desc'|| order == -1)? -1 : 1;
    let columna=req.query.columna;
   
   
    const regex = new RegExp(search, 'i');
    result= await Usuarios.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
       
       
    if (result.length === 0) {
        return res.send('No se encontraron usuarios');
    }
    else {
        let pagination = {
            data: result.docs,
            current_page: result.page,
            last_page: result.totalPages,
            from: 1,
            per_page: result.limit,
            status: true,
            to: result.limit,
            total: result.totalDocs,
        }
        res.send(pagination);
    }
}

exports.crearUsuarios = async (req, res) => {

    console.log(req.body)

    //Revisar si hay errores

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    //extraer usr y password
    const { user, password } = req.body;

    try {
        //Revisar que el usuario sea unico
        let usuario = await Usuarios.findOne({ user });

        if (usuario) {
            return res.status(400).json({ msg: 'El usuario ya fue registrado previamente' });
        }
        //crea nuevo usuario
        usuario = new Usuarios(req.body);

        //hash password
        const salt = await md5(password);
        usuario.password = salt;

        //guarda nuevo usuario
        await usuario.save();

        //Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //Firmar el jwt
        jwt.sign(payload, process.env.VERIFICADOR, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;

            //Mensaje de confirmacion
            res.json({ token });
        });

        res.send('Usuario guardado correctamente');
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

exports.actualizarUsuarios = async (req, res) => {
    const body = req.body;
    const password = body.password;
    let guardar;
    //hash password
    const salt = await md5(password);
    guardar = salt;
    Usuarios.updateOne({ _id: body._id }, {
        $set: {
            user: body.user,
            password: guardar,
            nombre: body.nombre,
            telefono: body.telefono,
            correo: body.correo,
            cui: body.cui,
            contratacion: body.contratacion,
            puesto: body.puesto,
            tienda: body.tienda,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: body.estado
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar el usuario',
                    err
                });
            }
            else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
}

exports.eliminarUsuarios = async (req, res) => {
    const body = req.body;
    const password = body.password;
    let guardar;
    //hash password
    const salt = await md5(password);
    guardar = salt;
    Usuarios.updateOne({ _id: body._id }, {
        $set: {
            user: body.user,
            password: guardar,
            nombre: body.nombre,
            telefono: body.telefono,
            correo: body.correo,
            cui: body.cui,
            contratacion: body.contratacion,
            puesto: body.puesto,
            tienda: body.tienda,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'INACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar el usuario',
                    err
                });
            }
            else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
}

exports.activarUsuarios = async (req, res) => {
    const body = req.body;
    const password = body.password;
    let guardar;
    //hash password
    const salt = await md5(password);
    guardar = salt;
    Usuarios.updateOne({ _id: body._id }, {
        $set: {
            user: body.user,
            password: guardar,
            nombre: body.nombre,
            telefono: body.telefono,
            correo: body.correo,
            cui: body.cui,
            contratacion: body.contratacion,
            puesto: body.puesto,
            tienda: body.tienda,
            actualizacion: Date.now(),
            registro: body.registro,
            estado: 'ACTIVO'
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar el usuario',
                    err
                });
            }
            else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
}