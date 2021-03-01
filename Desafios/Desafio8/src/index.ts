//Imports
import express from 'express'
import { productoClass } from './constructor'

//Express Initializing
const app = express()
const port: number = 8080

app.use(express.json())

/// The actual code///
let productos: any[] = []


// Get
app.get('/api/productos', (req: any,res: any) =>{
    productos.length > 0 ? res.json(productos) : res.sendStatus(204)
})

app.get('/api/productos/:id', (req: any,res: any) =>{
    const id = req.params.id
    const producto: any = productos.find( producto => producto.id === id)
    if (!producto) {
        res.sendStatus(404)
    }
})

//Post
app.post('/api/productos', (req: any, res: any) =>{
    const {title, price, thumbnail} = req.body
    let productoNuevo = new productoClass(productos.length, title, price, thumbnail)
    productos.push(productoNuevo)
    res.sendStatus(201)
})

//Listen
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})