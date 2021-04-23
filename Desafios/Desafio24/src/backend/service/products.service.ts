import {read, readOne, write, deleteOne, updateOne} from '../db/mongoDB.service'

export class Producto {
    private _id: string
    private timestamp: Date
    private name: string
    private description: string
    private code: string
    private price: number
    private stock: number

    constructor(id: string, timestamp: Date, name, description: string, code: string, price: number, stock: number){
        this._id = id
        this.timestamp = timestamp
        this.name = name
        this.description = description
        this.code = code
        this.price = price
        this.stock = stock
    } 
}

function productCheck(id: string, res: any) {
    const product: any = readOne('productos', {_id: id})
    if(!product){ res.sendStatus(404) }
    return product
}

export { productCheck}

module.exports = {

    getAll: (req, res) => {
        let products = read('productos')
        if (!products){
            res.sendStatus(404)
        }
        res.send(products)
    },

    create: (req, res) => {
        const {id, name, description, code, price, stock} = req.body
        let newProduct = new Producto(id, new Date(), name, description, code, price, stock)
        write('productos', newProduct)
        res.sendStatus(201)
    },

    getOne: (req, res) => {
        let product = productCheck(req.param.id, res)
        res.send(product)
    },

    deleteOne: (req, res) => {
        productCheck(req.param.id, res)
        deleteOne('productos', { _id: req.param.id} )
        res.sendStatus(200)
    },

    patchOne: (req, res) => {
        productCheck(req.param.id, res)
        updateOne('productos', req.param.id, req.param.value, req.body)              
        res.sendStatus(200)
    }
}

