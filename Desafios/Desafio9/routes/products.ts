//Imports
import { productoClass } from '../src/constructor'

//Express Initializing
const express = require('express')
const router = express.Router()

//Variables
let productos: any[] = []

//Services
const existanceCheck = (id, req, res) => {   
    const producto: any = productos.find( producto => producto.id === id)
    if (!producto) {
        res.sendStatus(404)
    }
    return producto
}
// Products Main
router.route('/productos')
    .get((req,res) =>{
        productos.length > 0 ? res.json(productos) : res.sendStatus(204)
    })
    .post((req, res) =>{
        const {title, price, thumbnail} = req.body 
        let productoNuevo = new productoClass(productos.length, title, price, thumbnail)
        productos.push(productoNuevo)
        console.log(productos)
        res.sendStatus(201)
    })

// Products :id
router.route('/productos/:id')
    .get((req,res: any) =>{
        existanceCheck(req.params.id, req, res)
    })
    .put((req,res) =>{
        const producto = existanceCheck(req.params.id, req, res)
        const { title, price, thumbnail } = req.body
        producto.title = title
        producto.price = price
        producto.thumbnail = thumbnail
    })
    .delete((req,res) =>{
        const id: number = req.params.id
        existanceCheck(id, req, res)
        productos = productos.filter( producto => producto.id !== id)
    })

//Exports
module.exports = router