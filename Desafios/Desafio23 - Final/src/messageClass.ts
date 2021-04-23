export class messageClass {
    author: object;
    text: string;

    constructor(id:string, nombre: string, apellido: string, edad: number, alias: string, avatar: string, text: string){
        this.author = {id, nombre, apellido, edad, alias, avatar}
        this.text = text
    }
}

