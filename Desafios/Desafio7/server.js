const express = require('express');
const fs = require('fs');
const app = express();
const port = 8800;
const productos = JSON.parse(fs.readFileSync('productos.txt', 'utf-8'));

////// Visitas //////
const path ='visitas.txt'
const readVisitas = () => {
    let result = {visitas: {item:0, items:0}}
    try {
        result = JSON.parse(fs.readFileSync(path, 'utf-8'))
    } catch (error) {
        console.log(error)
    }
    return result
}
const dumpVisitas = (stats) => {
    try {
        fs.writeFileSync(path, JSON.stringify(stats), { flag: 'w+' })
    } catch (error) {
        console.log(error)
    }
}

app.use((req, res, next) => {
    res.on('finish', () => {
        const stats = readVisitas()
        const event = `${req.originalUrl}`
        console.log(stats)
        switch (event){
            case '/item-random':
                stats.visitas.item =  stats.visitas.item ? stats.visitas.item + 1 : 1
                break
            case '/items':
                stats.visitas.items =  stats.visitas.items ? stats.visitas.items + 1 : 1
                break
        }
        dumpVisitas(stats)
    })
    next()
})
///// Cierra Visitas /////

app.get('/items', function(req, res) {
    const items = {
        items: productos,
        cantidad: productos.length
    }
    res.send(items);
});

app.get('/item-random', function(req, res) {
    const index = Math.floor(Math.random() * (productos.length - 0)) + 0;
    const item = { item: productos[index] }

    res.send(item);
});

app.get('/visitas', function(req, res) {
    res.json(readVisitas())
});

app.listen(port, () => {
    console.log('El server esta arriba')
});