import fs from 'fs'
///////////////////////////////////////////////////////////
//                  Desafio 34                           //
///////////////////////////////////////////////////////////
import * as twilio from '../services/twilio.service'

export class messageClass {
    author: object;
    text: string;

    constructor(id:string, nombre: string, apellido: string, edad: number, alias: string, avatar: string, text: string){
        this.author = {id, nombre, apellido, edad, alias, avatar}
        this.text = text
    }
}

module.exports = (io) => {
    //Io
    let messagesFromServer = fs.readFileSync('./public/messages.json', 'utf8')
    messagesFromServer = JSON.parse(messagesFromServer)

    io.on('connection', (socket) =>{
    socket.emit('Mensajes Anteriores', messagesFromServer)

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

            if(payload.text.includes('administrador')) {
                let msg = 'El usuario ' + payload.author.email + ' te envió el msg: ' + payload.text
                twilio.enviarSMS(msg, 'Numero de Telefono')
            }

            let messagesJSON = [...messagesFromServer, msg]

            fs.writeFile('./public/messages.json', JSON.stringify(messagesJSON), 'utf8', function (err) { console.log(err)})
        })
    })
}