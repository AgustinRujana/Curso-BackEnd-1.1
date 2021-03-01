const fs = require ('fs');

class Archivo {
    constructor (fileName){
        this.fileName = fileName;
    }

    async readFile(){
        try {
            const data = await fs.promises.readFile(this.fileName, 'utf-8');
            console.log(data);
        } catch(error) {
            console.log([]);
        }
    }

    async saveFile(title, price, thumbnail){
        try {
            const data = await fs.promises.readFile(this.fileName, 'utf-8');
            const Products = JSON.stringify(data)
            const newData = [...Products, {title:title, price:price, thumbnail:thumbnail, id: (Products.length + 1)}]
            
            fs.writeFileSync('./productos.txt', newData,'utf-8')
        } catch (error) {
            console.log('No existe el archivo');
        }
    }

    async deleteFile(){
        try {
            await fs.promises.unlink(this.fileName);
        } catch (error) {
            console.log('El archivo no existe, capaz ya lo borraste, vofi')
        }
    }

}