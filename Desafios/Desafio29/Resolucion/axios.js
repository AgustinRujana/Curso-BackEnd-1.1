const axios = require('axios')

const url = 'http://localhost:8080/productos'

//Agregar Productos
const agregoProductos = (data) => {
    axios.post( url, data)
    .then( () => {
        //Los obtengo por GET
            axios.get(url).then( response => { console.log(response.data) }).catch(error => { console.log(error)})
        // Obtengo la vista de los productos (Devuelve el html por eso la comente PD: Si quisiera que no lo haga devuelvo un .send(productos))
        // axios.get('http://localhost:8080/productos/vista').then( response => { console.log(response.data) }).catch(error => { console.log(error)})
        // Actualizo el producto ID-0
        axios.put('http://localhost:8080/productos/0',{
                        title: 'Producto Actualizado #1',
                        price: 1999,
                        thumbnail: 'Producto Actualizado #1 Thumbnail'
                    }).then( res => {
                        console.log(res.data)
                        // Despues lo borro
                        axios.delete('http://localhost:8080/productos/0').then(res => console.log(res)).catch(error => { console.log(error)})
                    }).catch(error => { console.log(error)})

    })
    .catch(error => {
        console.log(error)
    })
}

agregoProductos({
    title: 'Producto Prueba #1',
    price: 999,
    thumbnail: 'Producto Prueba #1 Thumbnail'
})


