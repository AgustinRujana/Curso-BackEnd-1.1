//Imports
import express from 'express'
import { setUncaughtExceptionCaptureCallback } from 'node:process';

const port: number = 8080;
const app = require('express')();
const httpServer = require('http').createServer(app);
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const HBSInitialize = require('./HbsInitialization')
const messageService = require('./services/messages.service')
const productoRoutes = require('./routes/products')
const userRoutes = require('./routes/user')

const io = require('socket.io')(httpServer);

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://agustin:Ar41735233@cluster0.5w5mk.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true}
    }),
    secret: 'Da fuck is this',
    resave: false,
    saveUninitialized: false,
    ttl: 10 * 60
}))

app.use(express.json());
app.use(express.urlencoded( {extended:true } ));
app.use(express.static('public'));

//Routes
productoRoutes(app)
userRoutes(app)

//Handlebars
HBSInitialize(app)

//Io
messageService(io)

//Listen
httpServer.listen(port, () => {
    console.log(`Running on port ${port}`)
})