const socket = io();
const form = document.getElementById('inputForm');
const input = document.getElementsByTagName('input');
const cuerpoTabla = document.getElementById('cuerpoTabla')

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    let productoNuevo = { title: input[0].value, price: input[1].value, thumbnail: input[2].value}

    socket.emit('Producto Nuevo', productoNuevo)

    for (let i = 0; i < 3; i++) {
        input[i].value = ''
    } 
})

socket.on('Producto Nuevo', (prod) =>{
    let lineaNueva = document.createElement('tr')
    lineaNueva.innerHTML = `<td><img height=75px src="${prod.thumbnail}" alt={this.title}></td><td>${prod.title}</td><td>${prod.price}</td>`
    cuerpoTabla.appendChild(lineaNueva)
})