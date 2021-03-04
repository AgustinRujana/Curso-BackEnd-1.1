import { parse } from "path";

const fs = require('fs')


export class messageClass {
    fileName : string

    constructor (fileName){
        this.fileName = fileName;
    }

    async readMsg(){
        try {
            const data = await fs.promises.readFile(this.fileName, 'utf-8');
            return JSON.parse(data)
        } catch(error) {
            console.log('Se rompio el readMsg()'); 
        }
    }

    async saveMsg(email, date, msg){
        try {
            const data = await fs.promises.readFile(this.fileName, 'utf-8');
            const messages = JSON.parse(data)
            const newData = [...messages, {email: email,date: date,msg: msg}]          
            fs.writeFileSync('./public/messages.txt', JSON.stringify(newData), function (err, file) {
                if (err) throw err;
                console.log('Guardado');
            });
        } catch (error) {
            console.log('No se guardo')
        }
    }
}