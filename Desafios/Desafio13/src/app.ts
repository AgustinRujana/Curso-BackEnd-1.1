//Imports
import express from 'express'
import handlebars from 'express-handlebars'
import {messageClass} from './messagesFile'
//Initialization
const fs = require('fs');

const port: number = 8080;

const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

app.use(express.json());
app.use(express.urlencoded( {extended:true } ));

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
let msg = new messageClass('./public/messages.txt')
io.on('connection', async (socket) =>{
    socket.emit('Mensajes Anteriores', await msg.readMsg())
    socket.on('Producto Nuevo', (prod) => {
        io.emit('Producto Nuevo', prod)
    })

    socket.on('message', (payload) => {
        io.emit('message', payload)
        msg.saveMsg(payload.email, payload.date, payload.msg)
    })
})

//Listen
httpServer.listen(port, () => {
    console.log(`Running on port ${port}`)
})