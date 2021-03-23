import { parse } from "path";
const { options } = require('../db/mysql.db')
const knex = require('knex')(options)
const fs = require('fs')

export class messageClass {
    fileName : string

    constructor (fileName){
        this.fileName = fileName;
    }

    async readMsg(){
        try {
            const data = knex.from('mensajes').select('*').then((rows) => {
                return rows
            })

            return JSON.parse(data)
        } catch(error) {
            console.log('Se rompio el readMsg()'); 
        }
    }

    async saveMsg(email, date, msg){
        try {
            const newData = {email: email,date: date,msg: msg}         
            knex('mensajes').insert(newData)
            .then(() => console.log('Guardado'))
            .catch((err) => console.log(err))
            .finally(() => knex.destroy())
        } catch (error) {
            console.log('No se guardo')
        }
    }
}