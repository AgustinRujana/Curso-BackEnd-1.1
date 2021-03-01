//Imports
import express from 'express'
import handlebars from 'express-handlebars'


//Express Initialization
const app = require('express')();
const port: number = 8080;
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

app.use(express.json())
app.use(express.urlencoded( {extended:true } ))

//Handlebars Initialization
app.engine('hbs', handlebars({
    extname:'.hbs',
    defaultLayout:'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))
app.set('views', './src/views')
app.set('view engine', 'hbs')

////Routers
//Products Main
app.use('/', require('../routes/products'))

//Public
app.use(express.static('public'))

//Io
io.on('connection', (socket) =>{

    socket.on('Producto Nuevo', (prod) => {
        io.emit('Producto Nuevo', prod)
        console.log(prod)
    })
    console.log(socket.id)
})

//Listen

// app.listen(port, () => {
//     console.log(`Running on port ${port}`)
// })

httpServer.listen(port, () => {
    console.log(`Running on port ${port}`)
})