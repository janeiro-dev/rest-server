const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');
const app = express();

let Producto = require('../models/producto');

//===================
// Obtener Productos
//===================

app.get('/producto', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);


    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: 'Producto no existe'
                });
            }

            res.status(200).json({
                ok: true,
                productoDB
            });
        });
});

app.get('/producto/:id', (req, res) => {
    id = req.params.id;
    body = req.body;
    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: 'ID no existe'
                });
            }

            res.status(200).json({
                ok: false,
                productoDB
            });
        });
});

app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productoBuscado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!productoBuscado) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.status(200).json({
                ok: true,
                productoBuscado
            });
        });
});

app.post('/producto', verificaToken, (req, res) => {
    body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            productoDB
        });
    });
});

app.put('/producto/:id', verificaToken, (req, res) => {
    id = req.params.id;
    body = req.body;

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoActualizado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        if (!productoActualizado) {
            return res.status(400).json({
                ok: false,
                err: 'No se puede actualizar un producto inexistente'
            });
        }

        res.status(200).json({
            ok: true,
            productoActualizado
        });
    });
});

app.delete('/producto/:id', verificaToken, (req, res) => {
    id = req.params.id;
    body = req.body;

    // Producto.findOneAndUpdate(id, { disponible: false }, (err, productoBorrado) => {
    //     disponible = false;
    //     if (err) {
    //         return res.status(500).json({
    //             ok: false,
    //             err
    //         });
    //     }
    //     if (!productoBorrado) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: 'No se puede un producto inexistente'
    //         });
    //     }
    //     res.status(200).json({
    //         ok: true,
    //         productoBorrado
    //     });

    // }); ó

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: 'No se puede un producto inexistente'
            });
        }
        productoDB.disponible = false;
        productoDB.save((err, productoBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.status(200).json({
                ok: true,
                productoBorrado
            });
        });
    });
});

module.exports = app;