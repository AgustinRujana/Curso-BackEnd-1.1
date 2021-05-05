export class productoClass {
    id: number;
    title: string;
    price: number;
    thumbnail: string;

    constructor(id:number, title: string, price: number, thumbnail: string){
        this.id = id
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}

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

module.exports = { 
    getAll: (req, res) => {
        res.sendFile('form&List.html', {root: './public'})
    },

    addOne: (req, res) => {
        const {title, price, thumbnail} = req.body 
        let productoNuevo = new productoClass(productos.length, title, price, thumbnail)
        productos.push(productoNuevo)
        res.sendFile('form&List.html', {root: './public'})
    },

    showAll: (req, res) => {
        productos.length > 0 ? res.render("productList", {productos, pageTitle : "Lista de productos", listExists: true}) : res.render("productList", {listExists: false})
    },

    getOne: (req, res) => {
        existanceCheck(req.params.id, req, res)
    },

    updateOne: (req, res) => {
        const producto = existanceCheck(req.params.id, req, res)
        const { title, price, thumbnail } = req.body
        producto.title = title
        producto.price = price
        producto.thumbnail = thumbnail
    },

    deleteOne: (req, res) => {
        const id: number = req.params.id
        existanceCheck(id, req, res)
        productos = productos.filter( producto => producto.id !== id)
    }
}

