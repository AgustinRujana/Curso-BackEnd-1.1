//Imports
import express from 'express'
import handlebars from 'express-handlebars'
import { denormalize, normalize, schema } from 'normalizr';


const port: number = 8000;

const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const fs = require('fs')

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

//Routes
app.use('/', require('../routes/products'))

//Public
app.use(express.static('public'))

//Io
let messagesFromServer = fs.readFileSync('./public/messages.json', 'utf8', function (err) { console.log(err)})
    messagesFromServer = JSON.parse(messagesFromServer)

const user = new schema.Entity('user')   
const msgData = new schema.Entity('messages', {
    author: user
})

//Desnormalizar
let denormalizeData = denormalize(messagesFromServer, {author: user}, user)

io.on('connection', (socket) =>{
    socket.emit('Mensajes Anteriores', denormalizeData)

    socket.on('message', (payload) => {
        io.emit('message', payload)
        const msg = {
            author: {
                id: payload.author.id,
                nombre: payload.author.nombre,
                apellido: payload.author.apellido,
                edad: payload.author.edad,
                alias: payload.author.alias,
                avatar: payload.author.avatar
            },
            text : payload.text
        }

        //Normalizar
        let messagesJSON = [...denormalizeData, msg]

        const normalizedData = normalize(messagesJSON, msgData);

        fs.writeFile('./public/messages.json', JSON.stringify(normalizedData), 'utf8', function (err) { console.log(err)})
    })
})

//Listen
httpServer.listen(port, () => {
    console.log(`Running on port ${port}`)
})