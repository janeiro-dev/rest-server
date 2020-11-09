const express = require('express');
const { verificaToken, verificaAdmin } = require('../middlewares/autenticacion');
let app = express();

let Categoria = require('../models/categoria');

//=======================
// Mostrar todas las categorias
//=======================
app.get('/categoria', (req, res) => {
    Categoria.find({})
        .populate('usuario', 'nombre email')
        .sort('descripcion')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.status(200).json({
                ok: true,
                categorias

            });
        });
});

//=======================
// Mostrar una categoria por id
//=======================
app.get('/categoria/:id', (req, res) => {
    let id = req.params.id;
    Categoria.findById(id, (err, categoria) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoria) {
            return res.status(400).json({
                ok: false,
                err: 'Esta categoria no existe'
            });
        }

        res.status(200).json({
            ok: true,
            categoria

        });
    });
});

//=======================
// Crear nueva categoria
//=======================
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    let category = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    category.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            categoriaDB

        });

    });

});


//=======================
// Actualizar categoria
//=======================
app.put('/categoria/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaActualizada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            categoriaActualizada

        });

    });
});


//=======================
// Borrar categoria
//=======================
app.delete('/categoria/:id', [verificaToken, verificaAdmin], (req, res) => {
    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: 'El id no existe'
            });
        }

        res.status(200).json({
            ok: true,
            message: 'categoria borrada'


        });
    });
});

module.exports = app;