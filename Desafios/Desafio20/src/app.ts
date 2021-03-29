//Imports
import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose';

import {messageClass} from './messagesFile'
const { options } = require('../db/mysql.db')
//Initialization
const { Schema } = mongoose;
mongoose.connect('mongodb://localhost/ecommerce', {useNewUrlParser: true, useUnifiedTopology: true});

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('we are in')
// });

const msgSchema = new Schema({
    email: String,
    date: Date,
    msg: String
})

const Msg = mongoose.model('mensajes', msgSchema)

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
io.on('connection', async (socket) =>{
    socket.emit('Mensajes Anteriores', await Msg.find())
    socket.on('Producto Nuevo', (prod) => {
        io.emit('Producto Nuevo', prod)
    })

    socket.on('message', (payload) => {
        io.emit('message', payload)
        const msg = new Msg({email: payload.email, date: payload.date, msg: payload.msg})
        msg.save()
    })
})

//Listen
httpServer.listen(port, () => {
    console.log(`Running on port ${port}`)
})