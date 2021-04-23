import { Producto } from './products.service'
import { productCheck} from './products.service'
import {read, readOne, write, deleteOne} from '../db/mongoDB.service'


export class Carrito {
    private id: string
    private timestamp: Date
    private productos: Producto[]

    constructor(id: string, timestamp: Date, productos: any[]) {
        this.id = id
        this.timestamp = timestamp
        this.productos = productos
    }
}

//Carrito
let id = 'Algo' //Este Id deberia ser automatico o algo problema de Agustin del futuro

module.exports = {

    getAll: (req, res) => {
        let carrito = read('carrito')
        if (!carrito){
            res.sendStatus(404)
        }
        res.send(carrito) 
    },

    create: (req, res) => {
        let newCarrito = new Carrito(id, new Date, [])
        write('carrito', newCarrito)
        res.sendStatus(201)
    },

    getOne: (req, res) => {
        let userCarrito = readOne('carrito', {_id: id})
        if (!userCarrito) { res.sendStatus(404) }
        res.send(userCarrito)
    },

    addOne: (req, res) => {
        let product = productCheck(req.param.id, res)
        let userCarrito = readOne('carrito', {_id: id})
        deleteOne('carrito', { _id: req.param.id} )
        userCarrito[2].push(product)
        write('carrito', userCarrito)
        res.sendStatus(200)
    },

    updateOne: (req, res) => {
        let product = productCheck( req.param.id, res )
        let userCarrito = readOne('carrito', {_id: id})
        deleteOne('carrito', { _id: req.param.id} )
        userCarrito[2] = userCarrito[2].filter( product => product.id !== req.param.id)
        write('carrito', userCarrito)
        res.sendStatus(200)
    }
}