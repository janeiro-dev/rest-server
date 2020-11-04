const jwt = require('jsonwebtoken');

// =======================
//verificar token
// =======================

let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: 'token no valido'
            });
        }

        req.usuario = decoded.usuario;
        next();

    });


}

// =======================
//verificar admin
// =======================

let verificaAdmin = (req, res, next) => {
    let usuario = req.usuario;
    userCondition = usuario.role;

    if (userCondition === 'ADMIN_ROLE') {
        next();


    } else {
        return res.status(401).json({
            ok: false,
            err: 'Usuario No tiene los permisos necesario, debe de ser administrador',
            userCondition,
            usuario

        });
    }

}

module.exports = {
    verificaToken,
    verificaAdmin

}