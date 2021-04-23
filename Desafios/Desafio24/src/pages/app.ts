//Imports
import express from 'express'

const app = require('express')()
const carritoRoutes = require('./routes/carrito')
const productosRoutes = require('./routes/productos')
const userRoutes = require('./routes/user')

//Port
const port: number = 8080

app.use(express.json)

//Routes
carritoRoutes(app)
productosRoutes(app)
userRoutes(app)

//Exits
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})