"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const messagesFile_1 = require("./messagesFile");
//Initialization
const fs = require('fs');
const port = 8080;
const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Handlebars Initialization
app.engine('hbs', express_handlebars_1.default({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));
app.set('views', './src/views');
app.set('view engine', 'hbs');
////Routers
//Products Main
app.use('/', require('../routes/products'));
//Public
app.use(express_1.default.static('public'));
//Io
let msg = new messagesFile_1.messageClass('./public/messages.txt');
io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    socket.emit('Mensajes Anteriores', yield msg.readMsg());
    socket.on('Producto Nuevo', (prod) => {
        io.emit('Producto Nuevo', prod);
    });
    socket.on('message', (payload) => {
        io.emit('message', payload);
        msg.saveMsg(payload.email, payload.date, payload.msg);
    });
}));
//Listen
httpServer.listen(port, () => {
    console.log(`Running on port ${port}`);
});
