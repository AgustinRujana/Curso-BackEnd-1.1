"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
const constructor_1 = require("../src/constructor");
//Express Initializing
const express = require('express');
const router = express.Router();
//Variables
let productos = [];
//Services
const existanceCheck = (id, req, res) => {
    const producto = productos.find(producto => producto.id === id);
    if (!producto) {
        res.sendStatus(404);
    }
    return producto;
};
// Products Main
router.route('/productos')
    .get((req, res) => {
    res.sendFile('form&List.html', { root: './public' });
})
    .post((req, res) => {
    const { title, price, thumbnail } = req.body;
    let productoNuevo = new constructor_1.productoClass(productos.length, title, price, thumbnail);
    productos.push(productoNuevo);
    res.sendFile('form&List.html', { root: './public' });
});
//Products Lista
router.route('/productos/vista')
    .get((req, res) => {
    productos.length > 0 ? res.render("productList", { productos, pageTitle: "Lista de productos", listExists: true }) : res.render("productList", { listExists: false });
});
// Products :id
router.route('/productos/:id')
    .get((req, res) => {
    existanceCheck(req.params.id, req, res);
})
    .put((req, res) => {
    const producto = existanceCheck(req.params.id, req, res);
    const { title, price, thumbnail } = req.body;
    producto.title = title;
    producto.price = price;
    producto.thumbnail = thumbnail;
})
    .delete((req, res) => {
    const id = req.params.id;
    existanceCheck(id, req, res);
    productos = productos.filter(producto => producto.id !== id);
});
//Exports
module.exports = router;
